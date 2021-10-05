import React, { FC } from 'react'
import { styled, Grid } from '@mui/material'
import numeral from 'numeral'
// import { useLocalStorage } from '@caldwell619/react-hooks'

import { Currency } from '@/features/currency-dropdown/CurrencyOption'
import { CurrencyCode } from '@/components'
import { useIsMobile } from '@/hooks'

export const ConversionDisplay: FC<Props> = ({
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
  /** If the amount is more than 2, add an s to make `dollar` into `dollars`. */
  const pluralLettering = createPluralLettering(numericAmount, baseCurrency?.currencyName)
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

/** List of know currencies that have an "s" at the end. It's far from complete, but works for this. */
const whitelistPlural = ['Dollar', 'Peso', 'Pound', 'Rupee', 'Shilling']
const createPluralLettering = (numericAmount: number, currencyName?: string) => {
  if (!currencyName) return ''
  const isCurrencyWhitelistedPlural = whitelistPlural.some(whitelistName => currencyName.includes(whitelistName))
  return isCurrencyWhitelistedPlural && numericAmount >= 2 ? 's' : ''
}

const prettyPrintAmount = (amount: number, numberFormat: string): string => numeral(amount).format(numberFormat)

const InputAmount = styled('h3')`
  margin: 0;
  font-size: 1em;
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
