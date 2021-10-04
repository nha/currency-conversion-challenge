import React, { FC } from 'react'
import { Grid } from '@mui/material'

import CurrencyCode from '@/components/shared/CurrencyCode'

const CurrencyOption: FC<Currency> = ({ currencyCode, currencyName }) => {
  return (
    <Grid container item xs={12}>
      <Grid xs={2}>
        <CountryFlag disableMargin currencyCode={currencyCode} />
      </Grid>
      <Grid xs={2}>
        <strong>
          <CurrencyCode currencyCode={currencyCode} />
        </strong>
      </Grid>
      <Grid xs={8}>{currencyName}</Grid>
    </Grid>
  )
}

interface CountryFlagProps {
  currencyCode: Currency['currencyName']
  disableMargin?: boolean
}
export const CountryFlag: FC<CountryFlagProps> = ({ currencyCode, disableMargin = false }) => (
  <span
    style={{ margin: disableMargin ? undefined : '0 10px' }}
    className={`currency-flag currency-flag-${currencyCode}`}
  ></span>
)

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
