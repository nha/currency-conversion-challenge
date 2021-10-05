import React, { FC, createContext, Dispatch, SetStateAction } from 'react'
import { useLocalStorage } from '@caldwell619/react-hooks'

import { Currency } from '@/components/currency-dropdown/CurrencyOption'

export const ChosenCurrency = createContext<IChosenCurrency>({} as IChosenCurrency)

export const ChosenCurrencyProvider: FC = ({ children }) => {
  const [baseCurrency, setBaseCurrency] = useLocalStorage<Currency | null>('baseCurrency', {
    currencyCode: 'usd',
    currencyName: 'United States Dollar'
  })

  const [compareToCurrency, setCompareToCurrency] = useLocalStorage<Currency | null>('compareToCurrency', {
    currencyCode: 'eur',
    currencyName: 'Euro'
  })

  const handleUpdateCurrency = (newCurrency: Currency | null, isBaseCurrency: boolean) => {
    isBaseCurrency ? setBaseCurrency(newCurrency) : setCompareToCurrency(newCurrency)
  }

  const handleSwapCurrencies = () => {
    // Capturing references to these state values so that if they change, the original values are captured and can be used.
    // This would normally be done with a callback, but since both are needed, this is the "safest" way of capturing the og reference
    const currentBaseCurrency = baseCurrency
    const currentCompareToCurrency = compareToCurrency
    setBaseCurrency(currentCompareToCurrency)
    setCompareToCurrency(currentBaseCurrency)
  }

  return (
    <ChosenCurrency.Provider
      value={{
        handleUpdateCurrency,
        baseCurrency,
        setBaseCurrency,
        compareToCurrency,
        setCompareToCurrency,
        handleSwapCurrencies
      }}
    >
      {children}
    </ChosenCurrency.Provider>
  )
}

interface IChosenCurrency {
  baseCurrency: Currency | null
  compareToCurrency: Currency | null
  setBaseCurrency: Dispatch<SetStateAction<Currency | null>>
  setCompareToCurrency: Dispatch<SetStateAction<Currency | null>>
  handleSwapCurrencies: () => void
  handleUpdateCurrency: (newCurrency: Currency | null, isBaseCurrency: boolean) => void
}
