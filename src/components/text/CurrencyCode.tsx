import React, { FC } from 'react'
import { styled } from '@mui/material'

/** The API returns all the currency codes in lower case. This simply uses CSS to uppercase it for display.
 * Since all the keys are lower case, calling `code.toUpperCase()` quickly became confusing
 * and likely less preformat that using CSS */
export const CurrencyCode: FC<Props> = ({ currencyCode }) => {
  return <CurrencyCodeText>{currencyCode}</CurrencyCodeText>
}

interface Props {
  currencyCode?: string
}

const CurrencyCodeText = styled('span')`
  text-transform: uppercase;
`
