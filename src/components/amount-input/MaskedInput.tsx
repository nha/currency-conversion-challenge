import * as React from 'react'
import NumberFormat from 'react-number-format'

interface Props {
  onChange: (event: { target: { value: string } }) => void
}

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

const NumberFormatInput = React.forwardRef<NumberFormat, Props>(NumberFormatInputRender)

export default NumberFormatInput
