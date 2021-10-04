import React, {
  ForwardRefRenderFunction,
  FC,
  createContext,
  forwardRef,
  useContext,
  useRef,
  useEffect,
  HTMLAttributes,
  ReactChild
} from 'react'
import { Typography, Popper, TextField, useMediaQuery } from '@mui/material'
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete'
import { useTheme, styled } from '@mui/material/styles'
import { VariableSizeList, ListChildComponentProps } from 'react-window'

import CurrencyOption, { Currency } from '@/components/CurrencyOption'

const LISTBOX_PADDING = 8 // px

const renderRow = ({ data, index, style }: ListChildComponentProps) => {
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

const OuterElementContext = createContext({})

const OuterElementType = forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = useContext(OuterElementContext)
  return <div ref={ref} {...props} {...outerProps} />
})

function useResetCache(data: unknown) {
  const ref = useRef<VariableSizeList>(null)
  useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true)
    }
  }, [data])
  return ref
}

const ListboxComponent: ForwardRefRenderFunction<HTMLDivElement, React.HTMLAttributes<HTMLElement>> = (props, ref) => {
  const { children, ...other } = props
  const itemData: ReactChild[] = []
  ;(children as ReactChild[]).forEach((item: ReactChild & { children?: ReactChild[] }) => {
    itemData.push(item)
    itemData.push(...(item.children || []))
  })

  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
    noSsr: true
  })
  const itemCount = itemData.length
  const itemSize = smUp ? 36 : 48

  const getChildSize = (child: ReactChild) => {
    if (child.hasOwnProperty('group')) {
      return 48
    }

    return itemSize
  }

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0)
  }

  const gridRef = useResetCache(itemCount)

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width='100%'
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType='ul'
          itemSize={index => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  )
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

const Virtualize: FC<Props> = ({ options, value, getOptionLabel, handleChange, label }) => {
  return (
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
            startAdornment: value ? (
              <>
                <span
                  style={{ marginLeft: '10px' }}
                  className={`currency-flag currency-flag-${value.countryCode}`}
                ></span>
                <strong style={{ marginLeft: '10px' }}>{value.countryCode.toUpperCase()}</strong>
              </>
            ) : undefined
          }}
          label={label}
        />
      )}
      fullWidth
      disablePortal
      getOptionLabel={getOptionLabel}
      value={value}
      onChange={(_, newData) => handleChange(newData)}
      renderOption={(props, option) => [props, option]}
    />
  )
}

interface Props {
  options: Currency[]
  value: Currency | null
  getOptionLabel: (Currency: Currency) => string
  handleChange: (newData: Currency | null) => void
  label: string
}

export default Virtualize
