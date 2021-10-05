import React, {
  memo,
  useContext,
  forwardRef,
  ForwardRefRenderFunction,
  createContext,
  ReactChild,
  useMemo
} from 'react'
import { FixedSizeList } from 'react-window'

import { renderRow, LISTBOX_PADDING } from './renderRow'

const OuterElementContext = createContext({})
const itemSize = 36
const getChildSize = () => itemSize

/** Most of this is from the [Mui docs](https://mui.com/components/autocomplete/#virtualization).  */
const ListboxComponent: ForwardRefRenderFunction<HTMLDivElement, React.HTMLAttributes<HTMLElement>> = (
  { children, ...other },
  ref
) => {
  const itemData = useMemo<ReactChild[]>(() => {
    const tempItemData: ReactChild[] = []
    ;(children as ReactChild[]).forEach((item: ReactChild) => {
      tempItemData.push(item)
    })
    return tempItemData
  }, [children])

  const getHeight = () => itemData.map(getChildSize).reduce((a, b) => a + b, 0)
  const height = getHeight() + 2 * LISTBOX_PADDING
  console.log('height', height)
  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <FixedSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width='100%'
          outerElementType={OuterElementType}
          innerElementType='ul'
          itemSize={itemSize}
          itemCount={itemData.length}
        >
          {renderRow}
        </FixedSizeList>
      </OuterElementContext.Provider>
    </div>
  )
}

const OuterElementType = forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = useContext(OuterElementContext)
  return <div ref={ref} {...props} {...outerProps} />
})

export default memo(ListboxComponent)
