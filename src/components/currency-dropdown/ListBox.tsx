import React, {
  useContext,
  forwardRef,
  useRef,
  useEffect,
  ForwardRefRenderFunction,
  createContext,
  ReactChild
} from 'react'
import { VariableSizeList } from 'react-window'

import { renderRow, LISTBOX_PADDING } from './renderRow'

const OuterElementContext = createContext({})

const ListboxComponent: ForwardRefRenderFunction<HTMLDivElement, React.HTMLAttributes<HTMLElement>> = (props, ref) => {
  const { children, ...other } = props
  const itemData: ReactChild[] = []
  ;(children as ReactChild[]).forEach((item: ReactChild & { children?: ReactChild[] }) => {
    itemData.push(item)
    itemData.push(...(item.children || []))
  })

  const itemCount = itemData.length
  const itemSize = 36

  const getChildSize = () => itemSize

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
          itemSize={getChildSize}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  )
}

const OuterElementType = forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = useContext(OuterElementContext)
  return <div ref={ref} {...props} {...outerProps} />
})

const useResetCache = (data: unknown) => {
  const ref = useRef<VariableSizeList>(null)
  useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true)
    }
  }, [data])
  return ref
}

export default ListboxComponent
