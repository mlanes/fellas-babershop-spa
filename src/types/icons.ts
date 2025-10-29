/**
 * Available icon names for the FIcon component
 */
export type IconName =
  | 'checkmark'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'close'
  | 'menu'
  | 'star'
  | 'star-filled'
  | 'instagram'
  | 'phone'
  | 'email'
  | 'location'
  | 'clock'
  | 'scissors'
  | 'crown'
  | 'quote'

/**
 * Icon component props
 */
export interface IconProps {
  /** Icon name */
  name: IconName
  /** Icon size in pixels */
  size?: number
  /** Icon color (CSS color value) */
  color?: string
}
