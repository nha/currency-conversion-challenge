import React, { FC } from 'react'
import { Grid } from '@mui/material'

const CurrencyOption: FC<Currency> = ({ countryCode, currencyName }) => {
  return (
    <Grid container item xs={12}>
      <Grid xs={2}>
        <span className={`currency-flag currency-flag-${countryCode}`}></span>
      </Grid>
      <Grid xs={2}>
        <strong>{countryCode?.toUpperCase()}</strong>
      </Grid>
      <Grid xs={8}>{currencyName}</Grid>
    </Grid>
  )
}

export interface Currency {
  /** 3 Character denomination of the currency
   * @example USD
   */
  countryCode: string
  /** The common name for the currency
   * @example US Dollar
   */
  currencyName: string
}

export default CurrencyOption
