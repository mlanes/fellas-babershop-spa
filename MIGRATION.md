# Migration: Netlify → Hetzner + Coolify + Cloudflare

A step-by-step runbook for moving `fellasbarber.com` off Netlify onto a
self-hosted stack that can also host the future fullstack app and any
side projects.

**Target stack:** Hetzner Cloud VPS (Ubuntu 24.04) running Coolify
(self-hosted PaaS), with Cloudflare in front for global edge cache +
DDoS protection.

**Total cost:** ~€5.50/mo regardless of how many projects you host.

---

## Phase 1 — Provision the Hetzner VPS

### 1.1 Sign up & create a project

- [console.hetzner.cloud](https://console.hetzner.cloud) → sign up, add
  payment method
- Top-left → **New Project** → name: `personal`

### 1.2 SSH key (already done)

The key `~/.ssh/id_ed25519_hetzner` was generated and added in
*Security → SSH Keys* as `mario-hetzner`.

### 1.3 Create the server

*Servers → Add Server*:

| Field | Choice |
|---|---|
| Location | **Falkenstein** (closest to Lisbon) |
| Image | **Ubuntu 24.04** |
| Type | **Shared vCPU → CX22** (€4.51/mo: 2 vCPU, 4 GB RAM, 40 GB SSD) |
| Networking | IPv4 + IPv6 (default) |
| SSH Keys | tick `mario-hetzner` |
| Volumes | none |
| Firewalls | (will create in 1.4) |
| Backups | optional (~20% surcharge); enable if you want hourly off-box snapshots |
| Placement Groups | none |
| Labels | optional, e.g. `role=coolify` |
| Name | `coolify-1` |

→ **Create & Buy now**.

Note the IPv4 address; everything below uses `<VPS_IP>` as a stand-in.

### 1.4 Firewall

*Firewalls → New Firewall* — inbound rules only:

| Port | Protocol | Source |
|---|---|---|
| 22 | TCP | Any IPv4 + IPv6 (or restrict to your IP if you have a static one) |
| 80 | TCP | Any |
| 443 | TCP | Any |

Attach to the `coolify-1` server. Do **not** open 8000 publicly — we'll
expose Coolify via a real domain (HTTPS) and keep dashboard traffic off
the public internet.

---

## Phase 2 — First login & basic hardening

```bash
# Add the SSH config entry on your laptop (one-time):
cat >> ~/.ssh/config <<EOF

Host hetzner-coolify
  HostName <VPS_IP>
  User root
  IdentityFile ~/.ssh/id_ed25519_hetzner
EOF

# Connect:
ssh hetzner-coolify
```

Run this hardening one-liner on the VPS (once):

```bash
# Disable password auth (you have SSH key only)
sed -i 's/^#*PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
sed -i 's/^#*PermitRootLogin.*/PermitRootLogin prohibit-password/' /etc/ssh/sshd_config
systemctl restart ssh

# Automatic security updates
apt update && apt install -y unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades

# fail2ban for brute-force SSH protection
apt install -y fail2ban
systemctl enable --now fail2ban
```

That's the minimum. (Optional: create a non-root user with sudo; not
strictly necessary on a Coolify-only box.)

---

## Phase 3 — Install Coolify

Still on the VPS:

```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

Takes ~5 minutes. Installs Docker, Coolify itself, Traefik (reverse
proxy + auto-HTTPS). When done it prints:

```
Coolify is installed and running at http://<VPS_IP>:8000
```

Open that URL in your browser, create the admin account (this is *your*
private Coolify — no shared anything). Save the credentials.

### 3.1 Expose Coolify dashboard on a real domain

In Coolify: **Settings → General**
- *Instance's Domain*: `coolify.fellasbarber.com`

Add a Cloudflare DNS record (Phase 4 below) for that subdomain pointing
at `<VPS_IP>`, then in Coolify hit *Save* — it'll issue a Let's Encrypt
cert via Traefik. Now `https://coolify.fellasbarber.com` works.

Once that's working, you can remove port 8000 from the firewall — all
dashboard traffic goes through HTTPS on 443.

---

## Phase 4 — Cloudflare in front

### 4.1 Add the domain

- Sign up at [cloudflare.com](https://cloudflare.com) (free tier)
- *Add a Site* → enter `fellasbarber.com` → **Free** plan
- Cloudflare scans existing DNS records — let it import them

### 4.2 Switch nameservers

Cloudflare gives you two nameservers like `xxx.ns.cloudflare.com`.

Go to your domain **registrar** (whoever you bought `fellasbarber.com`
from — wherever it is now, NOT Netlify) and change the domain's
nameservers to Cloudflare's two.

Propagation: usually <1h, can take up to 24h. Cloudflare emails you
when it sees the change.

### 4.3 DNS records

In Cloudflare **DNS** tab, set:

| Type | Name | Content | Proxy |
|---|---|---|---|
| A | `@` (root) | `<VPS_IP>` | 🟠 **Proxied** |
| A | `www` | `<VPS_IP>` | 🟠 **Proxied** |
| A | `coolify` | `<VPS_IP>` | 🟠 **Proxied** |

Proxied (orange cloud) is what gives you the edge CDN, DDoS protection,
and hides the VPS IP.

### 4.4 SSL / TLS settings

In Cloudflare **SSL/TLS → Overview**:
- Mode: **Full (strict)** — Cloudflare ↔ origin uses the Let's Encrypt
  cert that Coolify provisions. Don't use Flexible (it sends plain HTTP
  to the origin).

In **SSL/TLS → Edge Certificates**:
- *Always Use HTTPS*: **On**
- *Automatic HTTPS Rewrites*: **On**
- *Minimum TLS Version*: 1.2

In **Rules → Page Rules** (or *Caching → Cache Rules*):
- Optionally cache `/_nuxt/*` aggressively (1 year) — Nuxt asset
  hashing makes this safe.

---

## Phase 5 — Code changes (already in this repo)

Nothing for you to do here — this PR/branch includes:

- `nuxt.config.ts`: removed the explicit `nitro.preset: 'netlify'` so
  Nitro auto-detects per host (Netlify when building on Netlify,
  Node server everywhere else)
- `package.json`: added `engines.node: ">=20.0.0"` so Coolify's Nixpacks
  buildpack picks the right Node version
- `@nuxt/image`: no change needed — auto-falls-back to IPX on a Node
  deploy, which serves WebP/AVIF + resize from the same Node process

---

## Phase 6 — Deploy the site to Coolify

### 6.1 Connect GitHub

In Coolify: *Sources → New Source → GitHub App* → install the Coolify
GitHub app on your `mlanes` account, grant access to
`fellas-babershop-ssr`.

### 6.2 Create the project

*Projects → New Project* → name: `fellas-barbershop` → Environment:
`production`.

### 6.3 Add the resource

*+ New Resource → Public Repository (or Private via the GitHub app)*:

- Repository: `mlanes/fellas-babershop-ssr`
- Branch: `main`
- Build pack: **Nixpacks** (auto-detects Nuxt)
- Port: `3000`
- Domain: **`preview.fellasbarber.com`** for now (we'll switch to apex
  after verifying)

Build/start commands — Nixpacks auto-detects these from `package.json`:
- Install: `npm ci`
- Build: `npm run build`
- Start: `node .output/server/index.mjs`

### 6.4 Environment variables

*Environment Variables*:

| Key | Value |
|---|---|
| `NODE_ENV` | `production` |

That's it — `runtimeConfig.public.siteUrl` is baked into `nuxt.config.ts`.

### 6.5 First deploy

Add `preview.fellasbarber.com` as an A record in Cloudflare pointing at
`<VPS_IP>` (proxied), then in Coolify hit **Deploy**.

Watch the build log. ~3–5 minutes for the first build (`npm ci`
downloads everything; subsequent deploys are cached).

When it goes green, visit `https://preview.fellasbarber.com`. Verify:
- Page loads, hero video plays
- Images load (look at the `<img>` `src` attributes — should be
  `/_ipx/...` URLs, *not* `/.netlify/images?...`)
- Theme toggle works
- Language switcher works
- All 5 routes load
- Console is clean (no hydration mismatches, no 404s)

---

## Phase 7 — Cutover (only after Phase 6 is verified)

### 7.1 Lower the apex DNS TTL ahead of time

If you're already serving from Netlify on Cloudflare DNS, drop the TTL
on `@` and `www` to **Auto** (Cloudflare default ~5 min) a few hours
before cutover. Speeds up the switch.

### 7.2 Switch the apex

In Cloudflare DNS, change the `@` and `www` A records:
- Old content: Netlify's IPs (or whatever they pointed at)
- New content: `<VPS_IP>` (proxied 🟠)

Visitors hitting `https://fellasbarber.com` now resolve to Cloudflare,
which fetches from your Hetzner box and caches.

### 7.3 Add the domain to the Coolify app

In Coolify *Resource → Configuration → Domains*:
- Add `fellasbarber.com` and `www.fellasbarber.com`
- Coolify will issue Let's Encrypt certs for both (takes ~30s)

### 7.4 Verify

- `https://fellasbarber.com` works, valid cert
- Lighthouse mobile still ≥ 95
- Console clean
- All routes load
- Booking links resolve to AppBarber

Test from at least one mobile network (cellular, not your wifi) — DNS
caches at the ISP level can serve old records for a bit.

### 7.5 Decommission Netlify

Wait 24–48h to make sure no stale DNS caches are still resolving to
Netlify, then in the Netlify dashboard:
- *Site settings → Domain management* → remove `fellasbarber.com`
- *Site settings → General* → pause or delete the site

Don't delete the Netlify site immediately — keep it for rollback (see
below).

---

## Rollback plan

If anything goes seriously wrong post-cutover:

1. Cloudflare DNS → change `@` and `www` A records back to Netlify's
   IPs (or set them as CNAMEs to your Netlify deploy URL again).
2. Within ~5 minutes, traffic is back on Netlify.

That's the whole rollback. Keep the Netlify site around for at least
two weeks before deleting.

---

## Day-to-day after migration

### Deploying

```bash
git push origin main
```

Coolify watches the branch, builds, deploys. Same flow as Netlify.

### Logs / restart / SSH

- Logs: Coolify dashboard → Resource → *Logs* tab
- Restart: Resource → *Restart* button
- Shell into the container: Resource → *Terminal*
- Shell into the VPS itself: `ssh hetzner-coolify`

### Adding a second project (the future fullstack app)

In Coolify: *New Project → New Resource* — same flow as Phase 6.3.
Pick a different domain (e.g. `app.yourname.com`), Coolify routes it
via Traefik to the new container on the same VPS.

### Adding Postgres for the fullstack app

*New Resource → Database → PostgreSQL* → one click. Coolify provides
the connection string as an env var to whichever app you link it to.

### OS-level maintenance

`unattended-upgrades` (set up in Phase 2) auto-applies security
patches. Reboot the box once a month-ish:

```bash
ssh hetzner-coolify
apt update && apt upgrade -y
reboot
```

Coolify-managed apps auto-restart when the box comes back up.

### Backups

- **Hetzner snapshots**: console → server → *Snapshots → Take Snapshot*.
  Or enable scheduled Backups (paid, ~€1/mo) when the box hosts
  important data.
- **Postgres dumps** (when the fullstack app exists): Coolify supports
  scheduled backups → push to S3-compatible storage (Backblaze B2 ≈
  pennies/month).

---

## Cost summary

| | €/mo |
|---|---|
| Hetzner CX22 | 4.51 |
| Hetzner Snapshots (optional but recommended) | ~1.00 |
| Cloudflare Free | 0 |
| Coolify (self-hosted, open source) | 0 |
| **Total** | **~5.50** |

This figure does **not** change as you add more projects — same box
hosts them all until you outgrow it (resize to CX32 is one click).