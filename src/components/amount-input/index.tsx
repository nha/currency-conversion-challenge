import React, { FC } from 'react'
import { Grid, TextField, InputAdornment } from '@mui/material'
import { UseInputBind } from '@caldwell619/react-hooks'

import MaskedNumericInput from './MaskedInput'

const AmountInput: FC<Props> = ({ amount, doesAmountPass, currencySymbol, amountBind }) => {
  return (
    <Grid item xs={12} md={3}>
      <TextField
        // If the amount is empty, do not show error message
        error={amount ? !doesAmountPass : false}
        helperText={amount && !doesAmountPass ? 'Must less than 9 digits' : ' '}
        InputProps={{
          type: 'tel',
          startAdornment: <InputAdornment position='start'>{currencySymbol}</InputAdornment>,
          //@ts-expect-error
          inputComponent: MaskedNumericInput
        }}
        {...amountBind}
        fullWidth
        label='Amount'
      />
    </Grid>
  )
}

interface Props {
  amount: string
  doesAmountPass?: boolean
  currencySymbol: string
  amountBind: UseInputBind
}

export default AmountInput
