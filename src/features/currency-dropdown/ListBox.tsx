import React, { useContext, forwardRef, ForwardRefRenderFunction, createContext, ReactChild } from 'react'
import { FixedSizeList } from 'react-window'

import { renderRow, LISTBOX_PADDING } from './renderRow'

const OuterElementContext = createContext({})
const itemSize = 36
const getChildSize = () => itemSize

/** Most of this is from the [Mui docs](https://mui.com/components/autocomplete/#virtualization).  */
const ListboxComponent: ForwardRefRenderFunction<HTMLDivElement, React.HTMLAttributes<HTMLElement>> = (props, ref) => {
  const { children, ...other } = props
  const itemData: ReactChild[] = []
  ;(children as ReactChild[]).forEach((item: ReactChild & { children?: ReactChild[] }) => {
    itemData.push(item)
    itemData.push(...(item.children || []))
  })

  const itemCount = itemData.length
  const getHeight = () => itemData.map(getChildSize).reduce((a, b) => a + b, 0)

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
          overscanCount={2}
          itemCount={itemCount}
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

export default ListboxComponent
