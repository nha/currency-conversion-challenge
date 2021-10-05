import React, { FC, useContext, lazy } from 'react'
import { styled, Alert, CardContent, Card, Grid, IconButton, LinearProgress } from '@mui/material'
import ReverseCurrencyIcon from '@mui/icons-material/CompareArrows'

import { useCurrencySelections, useIsMobile } from '@/hooks'
import { ChosenCurrency } from '@/providers'
import { Currency } from '@/features/currency-dropdown/CurrencyOption'
const CurrencySelectionDropdown = lazy(() => import('@/features/currency-dropdown'))
const ConversionResult = lazy(() => import('@/features/conversion-result'))
const AmountInput = lazy(() => import('@/features/amount-input'))

const CurrencyConvert: FC = () => {
  const { baseCurrency, compareToCurrency, handleUpdateCurrency } = useContext(ChosenCurrency)

  const {
    fetchAllCurrenciesError,
    compareCurrencyError,
    isComparisonLoading,
    isAllCurrenciesLoading,
    amountBind,
    currencyOptions,
    currencySymbol,
    exchangeRate,
    amount,
    lastUpdatedAt,
    doesAmountPass
  } = useCurrencySelections()

  return (
    <Layout error={fetchAllCurrenciesError} isLoading={isAllCurrenciesLoading}>
      <Grid container spacing={3}>
        <AmountInput
          amount={amount}
          doesAmountPass={doesAmountPass}
          amountBind={amountBind}
          currencySymbol={currencySymbol}
        />
        <CurrencySelectionDropdown
          value={baseCurrency}
          options={currencyOptions}
          getOptionLabel={getOptionLabel}
          handleChange={newCurrency => handleUpdateCurrency(newCurrency, true)}
          label='From'
        />
        <SwapCurrenciesButton />
        <CurrencySelectionDropdown
          value={compareToCurrency}
          options={currencyOptions}
          getOptionLabel={getOptionLabel}
          handleChange={newCurrency => handleUpdateCurrency(newCurrency, false)}
          label='To'
        />
      </Grid>
      <ConversionResult
        isLoading={isComparisonLoading}
        doesAmountPass={doesAmountPass}
        amount={amount}
        exchangeRate={exchangeRate}
        lastUpdatedAt={lastUpdatedAt}
        error={compareCurrencyError}
        currencySymbol={currencySymbol}
      />
    </Layout>
  )
}

interface LayoutProps {
  error: unknown
  isLoading: boolean
}
const Layout: FC<LayoutProps> = ({ error, isLoading, children }) => (
  <Grid container justifyContent='center'>
    <Grid item xs={11}>
      <LayoutTitle>Currency Converter</LayoutTitle>
      <ApiCredit>
        Powered by{' '}
        <a href='https://github.com/fawazahmed0/currency-api' target='_blank' rel='noopener noreferrer'>
          fawazahmed0's Currency API
        </a>{' '}
      </ApiCredit>
      <Card elevation={4}>
        <CardContent>
          {error ? (
            <Alert sx={{ marginBottom: theme => theme.spacing(4) }} severity='error'>
              Something went wrong. Please try again.
            </Alert>
          ) : null}
          {isLoading ? <LinearProgress /> : children}
        </CardContent>
      </Card>
    </Grid>
  </Grid>
)

const LayoutTitle = styled('h1')`
  margin: 0;
`
const ApiCredit = styled('p')`
  margin: 0 0 ${({ theme }) => theme.spacing(4)} 0;
`

const SwapCurrenciesButton: FC = () => {
  const isMobile = useIsMobile()
  const { handleSwapCurrencies } = useContext(ChosenCurrency)
  return (
    <Grid
      item
      xs={12}
      md={1}
      sx={{
        display: 'flex',
        marginBottom: {
          md: '20px'
        }
      }}
      justifyContent='center'
      alignItems='center'
    >
      <IconButton sx={{ padding: theme => ({ xs: '0', md: theme.spacing(1) }) }} onClick={handleSwapCurrencies}>
        <ReverseCurrencyIcon sx={{ transform: `rotate(${isMobile ? '90deg' : '0'})` }} />
      </IconButton>
    </Grid>
  )
}

const getOptionLabel = (option: Currency | null): string => {
  if (!option) return ''
  // Since this cannot be influenced with CSS, it's transformed via JS
  return `${option.currencyCode.toUpperCase()} ${option.currencyName}`
}

export const parseQueryString = () => {
  const params = new URLSearchParams(window.location.search)
  const compareToCurrencyId = params.get('to')
  const baseCurrencyId = params.get('from')
  const amount = params.get('amount')
  return {
    compareToCurrencyId,
    baseCurrencyId,
    amount
  }
}

export default CurrencyConvert
