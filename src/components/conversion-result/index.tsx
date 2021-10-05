import React, { Dispatch, FC, useContext } from 'react'
import { Alert, Grid, Collapse, LinearProgress } from '@mui/material'
import { useLocalStorage } from '@caldwell619/react-hooks'

import { ChosenCurrency } from '@/providers'
import { useIsMobile } from '@/hooks'
import { Currency } from '@/components/currency-dropdown/CurrencyOption'
import ConversionDisplay from './Result'
import LastUpdated from './LastUpdated'

const ConversionResult: FC<Props> = ({ amount, exchangeRate, lastUpdatedAt, doesAmountPass, error, isLoading }) => {
  const isMobile = useIsMobile()
  const { baseCurrency, compareToCurrency } = useContext(ChosenCurrency)
  // If the user is mobile, shorten by default
  const [areNumbersShortened, setAreNumbersShortened] = useLocalStorage<boolean>('areNumbersShortened', isMobile)

  const doesHaveError = !!error || !doesAmountPass
  const sharedProps: DisplayResultProps = {
    doesHaveError,
    lastUpdatedAt,
    setAreNumbersShortened,
    areNumbersShortened,
    exchangeRate,
    amount,
    baseCurrency,
    compareToCurrency
  }

  return (
    <Grid item xs={12}>
      {isLoading && !!amount ? (
        <LinearProgress sx={{ marginTop: theme => theme.spacing(3) }} variant='indeterminate' />
      ) : null}
      <Collapse in={(!!exchangeRate && !!amount) || !!error}>
        <Grid container item xs={12} sx={{ paddingTop: theme => theme.spacing(3) }}>
          <ErrorMessage error={error} doesAmountPass={doesAmountPass} />
          <DisplayResult {...sharedProps} />
        </Grid>
      </Collapse>
    </Grid>
  )
}

interface ErrorMessageProps {
  doesAmountPass?: boolean
  error: unknown
}
const ErrorMessage: FC<ErrorMessageProps> = ({ error, doesAmountPass }) => {
  if (!error && doesAmountPass) return null
  return (
    <Grid item xs={12} sx={{ marginTop: theme => theme.spacing(3) }}>
      <Alert severity='error'>
        {doesAmountPass ? 'Something went wrong. Please try again' : 'Please fix the above errors to see result'}
      </Alert>
    </Grid>
  )
}

interface DisplayResultProps {
  doesHaveError: boolean
  lastUpdatedAt?: string
  setAreNumbersShortened: Dispatch<React.SetStateAction<boolean>>
  areNumbersShortened: boolean
  exchangeRate?: number
  amount: string
  baseCurrency: Currency | null
  compareToCurrency: Currency | null
}
const DisplayResult: FC<DisplayResultProps> = ({ doesHaveError, ...restProps }) => {
  if (doesHaveError) return null
  return (
    <>
      <ConversionDisplay {...restProps} />
      <LastUpdated {...restProps} />
    </>
  )
}

interface Props {
  amount: string
  exchangeRate?: number
  lastUpdatedAt?: string
  doesAmountPass?: boolean
  error: unknown
  isLoading: boolean
}

export default ConversionResult
