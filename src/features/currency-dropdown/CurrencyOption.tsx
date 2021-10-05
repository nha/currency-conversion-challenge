import React, { FC } from 'react'
import { styled, Grid } from '@mui/material'
import isPropValid from '@emotion/is-prop-valid'

import { CurrencyCode } from '@/components'

const CurrencyOption: FC<Currency> = ({ currencyCode, currencyName }) => {
  return (
    <Grid container item xs={12}>
      <Grid item xs={2}>
        <CountryFlag disableMargin currencyCode={currencyCode} />
      </Grid>
      <Grid item xs={2}>
        <strong>
          <CurrencyCode currencyCode={currencyCode} />
        </strong>
      </Grid>
      <Grid item xs={8}>
        {currencyName}
      </Grid>
    </Grid>
  )
}

interface CountryFlagProps {
  currencyCode: Currency['currencyName']
  disableMargin?: boolean
}
export const CountryFlag: FC<CountryFlagProps> = ({ currencyCode, disableMargin = false }) => (
  <CountryFlagSpan
    disableMargin={disableMargin}
    className={`currency-flag currency-flag-${currencyCode}`}
  ></CountryFlagSpan>
)

const CountryFlagSpan = styled('span', { shouldForwardProp: isPropValid })<Pick<CountryFlagProps, 'disableMargin'>>`
  ${({ disableMargin }) => (disableMargin ? '' : 'margin: 0 10px;')}
`
export interface Currency {
  /** 3 Character denomination of the currency
   * @example USD
   */
  currencyCode: string
  /** The common name for the currency
   * @example US Dollar
   */
  currencyName: string
}

export default CurrencyOption
