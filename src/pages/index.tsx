import React, { FC, useState, useMemo } from 'react'
import { Alert, CardContent, Card, Grid, TextField, IconButton, Button, LinearProgress } from '@mui/material'
import ReverseCurrencyIcon from '@mui/icons-material/CompareArrows'

import { useFetchAllCurrencies } from '@/hooks'
import { Currency } from '@/components/CurrencyOption'
import VirtualizedAutocomplete from '@/components/VirtualizedAutoComplete'

const CurrencyConvert: FC = () => {
  const { currencyMap, isLoading, error } = useFetchAllCurrencies()
  const currencyOptions = useMemo<Currency[]>(
    () => Object.entries(currencyMap).map(([key, value]) => ({ countryCode: key, currencyName: value })),
    [currencyMap]
  )
  const [baseCurrency, setBaseCurrency] = useState<Currency | null>(null)
  const [compareToCurrency, setCompareToCurrency] = useState<Currency | null>(null)

  const handleUpdateCurrency = (newCurrency: Currency | null, isBaseCurrency: boolean) => {
    isBaseCurrency ? setBaseCurrency(newCurrency) : setCompareToCurrency(newCurrency)
  }

  const handleSwapCurrencies = () => {
    setBaseCurrency(currentBaseCurrency => {
      setCompareToCurrency(currentBaseCurrency)
      return compareToCurrency
    })
  }

  return (
    <Grid container xs={12} justifyContent='center'>
      <Grid item xs={11}>
        <h1>Currency Converter</h1>
        <p>Check live foreign currency exchange rates</p>
        <Card>
          <CardContent>
            {error ? <Alert severity='error'>Something went wrong. Please try again.</Alert> : null}
            {isLoading ? <LinearProgress /> : null}
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <TextField fullWidth label='Amount' />
              </Grid>
              <Grid item xs={12} md={4}>
                <VirtualizedAutocomplete
                  value={baseCurrency}
                  options={currencyOptions}
                  getOptionLabel={getOptionLabel}
                  handleChange={newCurrency => handleUpdateCurrency(newCurrency, true)}
                  label='From'
                />
              </Grid>
              <Grid item xs={12} md={1} sx={{ display: 'flex' }} justifyContent='center' alignItems='center'>
                <IconButton onClick={handleSwapCurrencies}>
                  <ReverseCurrencyIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12} md={4}>
                <VirtualizedAutocomplete
                  value={compareToCurrency}
                  options={currencyOptions}
                  getOptionLabel={getOptionLabel}
                  handleChange={newCurrency => handleUpdateCurrency(newCurrency, false)}
                  label='To'
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex' }} justifyContent='flex-end'>
                <Button>Convert</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

const getOptionLabel = (option: Currency | null): string => {
  if (!option) return ''
  return option.currencyName
}

export default CurrencyConvert
