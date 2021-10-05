import React, { FC, forwardRef, HTMLAttributes } from 'react'
import { styled, Popper, autocompleteClasses, TextField, Grid, Autocomplete } from '@mui/material'

import { Currency, CountryFlag } from '@/features/currency-dropdown/CurrencyOption'
import ListboxComponent from './ListBox'

const CurrencySelectionDropdown: FC<Props> = ({ options, value, getOptionLabel, handleChange, label }) => {
  return (
    <Grid item xs={12} md={4}>
      <Autocomplete
        disableListWrap
        PopperComponent={StyledPopper}
        ListboxComponent={Listbox}
        options={options}
        renderInput={params => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              startAdornment: value ? <CountryFlag currencyCode={value.currencyCode} /> : undefined
            }}
            label={label}
          />
        )}
        isOptionEqualToValue={({ currencyCode }) => currencyCode.toLowerCase() === value?.currencyCode.toLowerCase()}
        fullWidth
        disablePortal
        getOptionLabel={getOptionLabel}
        value={value}
        onChange={(_, newData) => handleChange(newData)}
        renderOption={(props, option) => [props, option]}
      />
    </Grid>
  )
}

interface Props {
  options: Currency[]
  value: Currency | null
  getOptionLabel: (Currency: Currency) => string
  handleChange: (newData: Currency | null) => void
  label: string
}

// Adapter for react-window
const Listbox = forwardRef<HTMLDivElement, HTMLAttributes<HTMLElement>>(ListboxComponent)

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0
    }
  }
})

export default CurrencySelectionDropdown
