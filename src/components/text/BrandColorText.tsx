import { styled } from '@mui/material'

export const BrandColorText = styled('span')`
  color: ${({ theme: { palette } }) => palette.primary.main};
`
