import React, { Dispatch, FC, SetStateAction } from 'react'
import { Grid, styled, FormControlLabel, Switch } from '@mui/material'
import format from 'date-fns/format'

import { Currency } from '@/components/currency-dropdown/CurrencyOption'
import { BrandColorText } from '@/components/shared'

const CurrencyLastUpdated: FC<Props> = ({
  baseCurrency,
  compareToCurrency,
  lastUpdatedAt,
  setAreNumbersShortened,
  areNumbersShortened
}) => {
  const formattedDate = formatDate(lastUpdatedAt)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAreNumbersShortened(event.target.checked)
  }

  return (
    <Grid
      item
      xs={12}
      md={6}
      justifyContent='space-between'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: { xs: 'flex-start', md: 'flex-end' },
        marginTop: theme => ({ xs: theme.spacing(3), md: '0' })
      }}
    >
      <FormControlLabel
        sx={{ marginBottom: theme => ({ xs: theme.spacing(4), md: theme.spacing(3) }) }}
        control={
          <Switch checked={areNumbersShortened} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
        }
        label='Abbreviate Resulting Rates'
      />
      <Text>
        <BrandColorText>{baseCurrency?.currencyName}</BrandColorText> to{' '}
        <BrandColorText>{compareToCurrency?.currencyName}</BrandColorText> conversion
      </Text>
      <Text>
        Last updated <BrandColorText>{formattedDate}</BrandColorText>
      </Text>
    </Grid>
  )
}

const Text = styled('p')`
  margin: 0;
  font-size: 0.85em;
`

const formatString = 'MMMM do, yyyy hh:mm aaaa'

interface Props {
  lastUpdatedAt?: string
  baseCurrency: Currency | null
  compareToCurrency: Currency | null
  areNumbersShortened: boolean
  setAreNumbersShortened: Dispatch<SetStateAction<boolean>>
}

const formatDate = (dateToFormat?: string): string => {
  if (!dateToFormat) return '-'
  try {
    const formattedDate = format(new Date(dateToFormat), formatString)
    return formattedDate
  } catch (e) {
    return '-'
  }
}

export default CurrencyLastUpdated
