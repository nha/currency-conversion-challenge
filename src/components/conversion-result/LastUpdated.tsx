import React, { Dispatch, FC, SetStateAction } from 'react'
import { Grid, styled, FormControlLabel, Switch } from '@mui/material'
import format from 'date-fns/format'

import { Currency } from '@/components/currency-dropdown/CurrencyOption'
import { BrandColorText } from '@/components/shared'
import { getMobileBreakpoint } from '@/hooks'

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
    <Container item xs={12} md={6}>
      <AbbreviateFormLabel
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
    </Container>
  )
}

const Text = styled('p')`
  margin: 0;
  font-size: 0.85em;
`

const Container = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing(3)};
  ${getMobileBreakpoint} {
    margin-top: 0;
    align-items: flex-end;
  }
`

const AbbreviateFormLabel = styled(FormControlLabel)`
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  ${getMobileBreakpoint} {
    margin-bottom: ${({ theme }) => theme.spacing(3)};
  }
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
