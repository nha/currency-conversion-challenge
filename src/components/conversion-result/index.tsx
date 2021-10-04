import React, { FC, useContext } from 'react'
import { Alert, Grid, Collapse, LinearProgress } from '@mui/material'

import { ChosenCurrency } from '@/providers'
import ConversionDisplay from './Result'
import LastUpdated from './LastUpdated'
import { useLocalStorage } from '@caldwell619/react-hooks'
import { useIsMobile } from '@/hooks'

const ConversionResult: FC<Props> = ({ amount, exchangeRate, lastUpdatedAt, doesAmountPass, error, isLoading }) => {
  const isMobile = useIsMobile()
  const { baseCurrency, compareToCurrency } = useContext(ChosenCurrency)
  // If the user is mobile, shorten by default
  const [areNumbersShortened, setAreNumbersShortened] = useLocalStorage<boolean>('areNumbersShortened', isMobile)

  return (
    <Grid item xs={12}>
      {isLoading && !!amount ? (
        <LinearProgress sx={{ marginTop: theme => theme.spacing(3) }} variant='indeterminate' />
      ) : null}
      <Collapse in={(!!exchangeRate && !!amount && doesAmountPass) || !!error}>
        <Grid container item xs={12} sx={{ paddingTop: theme => theme.spacing(3) }}>
          {error ? (
            <Grid item xs={12} sx={{ marginTop: theme => theme.spacing(3) }}>
              <Alert severity='error'>Something went wrong. Please try again</Alert>
            </Grid>
          ) : (
            <>
              <ConversionDisplay
                areNumbersShortened={areNumbersShortened}
                exchangeRate={exchangeRate}
                amount={amount}
                compareToCurrency={compareToCurrency}
                baseCurrency={baseCurrency}
              />

              <LastUpdated
                areNumbersShortened={areNumbersShortened}
                setAreNumbersShortened={setAreNumbersShortened}
                baseCurrency={baseCurrency}
                compareToCurrency={compareToCurrency}
                lastUpdatedAt={lastUpdatedAt}
              />
            </>
          )}
        </Grid>
      </Collapse>
    </Grid>
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
