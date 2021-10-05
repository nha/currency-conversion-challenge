import React, { FC } from 'react'
import { styled } from '@mui/material'

import { Header } from '@/components'
import CurrencyConvert from '@/pages'
// Local storage persist
// import { ChosenCurrencyProvider } from '@/providers'
// URL persist
import { ChosenCurrencyProvider } from '@/providers/experimental/ChosenCurrency'

const App: FC = () => {
  return (
    <Root>
      <Header />
      <ChosenCurrencyProvider>
        <CurrencyConvert />
      </ChosenCurrencyProvider>
    </Root>
  )
}

const Root = styled('div')`
  padding: 1% 2% 10vh 2%;
  width: 100%;
  padding-top: 70px;
  display: flex;
  align-items: center;
  width: 100%;
  & a {
    text-decoration: none;
    color: ${({ theme: { palette } }) => palette.primary.main};
  }
`

export default App
