import React from 'react'
import { Typography } from '@mui/material'
import { ListChildComponentProps } from 'react-window'

import CurrencyOption from '@/components/currency-dropdown/CurrencyOption'

export const LISTBOX_PADDING = 8 // px
export const renderRow = ({ data, index, style }: ListChildComponentProps) => {
  const dataSet = data[index]
  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING
  }

  return (
    <Typography component='li' {...dataSet[0]} noWrap style={inlineStyle}>
      <CurrencyOption {...dataSet[1]} />
    </Typography>
  )
}
