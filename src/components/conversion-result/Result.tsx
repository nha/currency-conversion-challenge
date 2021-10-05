import React, { FC } from 'react'
import { styled, Grid } from '@mui/material'
import numeral from 'numeral'
// import { useLocalStorage } from '@caldwell619/react-hooks'

import { Currency } from '@/components/currency-dropdown/CurrencyOption'
import CurrencyCode from '@/components/shared/CurrencyCode'
import { useIsMobile } from '@/hooks'

const ConversionDisplay: FC<Props> = ({
  amount,
  baseCurrency,
  compareToCurrency,
  exchangeRate = 0,
  areNumbersShortened,
  currencySymbol
}) => {
  const isMobile = useIsMobile()
  const numberFormat = areNumbersShortened ? '0.00a' : '0,0.00'
  const numericAmount = Number(amount)
  const prettyPrintedAmount = prettyPrintAmount(numericAmount, numberFormat)
  const numericExchangeResult = numericAmount * exchangeRate
  const prettyPrintedExchangeResult = prettyPrintAmount(numericExchangeResult, numberFormat)
  const prettyPrintedExchangeRate = prettyPrintAmount(exchangeRate, numberFormat)
  /** If the amount is more than 2, add an s to make `dollar` into `dollars`. Doesn't work with all currency, such as Bitcoin. */
  const pluralLettering = numericAmount >= 2 ? 's' : ''
  return (
    <Grid item xs={12} md={6}>
      <InputAmount>
        <BrandColorText>{prettyPrintedAmount}</BrandColorText> {baseCurrency?.currencyName}
        {pluralLettering} =
      </InputAmount>
      <Result>
        {prettyPrintedExchangeResult}
        {isMobile ? <br /> : null}{' '}
        <BrandColorText>
          {compareToCurrency?.currencyName}
          {pluralLettering}
        </BrandColorText>
      </Result>
      <ExchangeRate>
        1 <CurrencyCode currencyCode={compareToCurrency?.currencyCode} /> = {currencySymbol}
        {prettyPrintedExchangeRate} <CurrencyCode currencyCode={baseCurrency?.currencyCode} />
      </ExchangeRate>
    </Grid>
  )
}

const prettyPrintAmount = (amount: number, numberFormat: string): string => numeral(amount).format(numberFormat)

const InputAmount = styled('h5')`
  margin: 0;
`
const Result = styled('h2')`
  margin: 0 0 0 0;
`
const ExchangeRate = styled('p')`
  margin: ${({ theme }) => theme.spacing(3)} 0 0 0;
`

interface Props {
  amount: string
  baseCurrency: Currency | null
  compareToCurrency: Currency | null
  exchangeRate?: number
  areNumbersShortened: boolean
  currencySymbol: string
}

const BrandColorText = styled('span')`
  color: ${({ theme: { palette } }) => palette.primary.main};
`

export default ConversionDisplay
