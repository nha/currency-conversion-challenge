import { Theme, useMediaQuery, useTheme } from '@mui/material'

export const useIsMobile = () => {
  const {
    breakpoints: { down }
  } = useTheme()
  // Will return true if the current screen is below the `sm` threshold
  const isMobile = useMediaQuery(down('sm'))

  return isMobile
}

/** Used for `styled` calls, instead of doing this inline, or worse, putting a random number as the cutoff breakpoint.
 * @returns '@media screen and (min-width: XXXpx)'
 */
export const getMobileBreakpoint = ({
  theme: {
    breakpoints: { up }
  }
}: {
  theme: Theme
}) => up('sm')
