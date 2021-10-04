import { Theme, useMediaQuery, useTheme } from '@mui/material'

export const useIsMobile = () => {
  const {
    breakpoints: { up }
  } = useTheme()
  const isDesktop = useMediaQuery(up('sm'))

  return !isDesktop
}

export const getMobileBreakpoint = ({
  theme: {
    breakpoints: { up }
  }
}: {
  theme: Theme
}) => up('sm')
