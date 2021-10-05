import * as React from 'react'
import NumberFormat from 'react-number-format'

const NumberFormatInputRender: React.ForwardRefRenderFunction<NumberFormat, Props> = function NumberFormatCustom(
  { onChange, ...other },
  ref
) {
  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={({ value }) => {
        onChange({ target: { value } })
      }}
      thousandSeparator
      isNumericString
      type='tel'
    />
  )
}

interface Props {
  onChange: (event: { target: { value: string } }) => void
}

export const NumberFormatInput = React.forwardRef<NumberFormat, Props>(NumberFormatInputRender)
