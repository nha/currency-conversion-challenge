import React, { FC, createContext, Dispatch, SetStateAction, useState } from 'react'

import { Currency } from '@/components/currency-dropdown/CurrencyOption'

export const ChosenCurrency = createContext<IChosenCurrency>({} as IChosenCurrency)

/** This implementation uses the URL rather than local storage. I haven't decided which is better. */
export const ChosenCurrencyProvider: FC = ({ children }) => {
  const { urlBaseCurrency = null, urlCompareToCurrency = null } = getPrevCurrenciesFromUrl() || {}
  const [baseCurrency, setBaseCurrency] = useState<Currency | null>(urlBaseCurrency)
  const [compareToCurrency, setCompareToCurrency] = useState<Currency | null>(urlCompareToCurrency)

  const handleUpdateCurrency = (newCurrency: Currency | null, isBaseCurrency: boolean) => {
    isBaseCurrency ? setBaseCurrency(newCurrency) : setCompareToCurrency(newCurrency)
    const fromCurrency = isBaseCurrency ? newCurrency : baseCurrency
    const toCurrency = isBaseCurrency ? compareToCurrency : newCurrency
    if (!fromCurrency || !toCurrency) return

    window.history.replaceState({}, '', `${window.location.pathname}?${generateSearch(fromCurrency, toCurrency)}`)
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

enum SearchParams {
  FromId = 'fromId',
  ToId = 'toId',
  FromName = 'fromName',
  ToName = 'toName'
}

interface UrlParseResult {
  urlBaseCurrency: Currency
  urlCompareToCurrency: Currency
}
const getPrevCurrenciesFromUrl = (): UrlParseResult | undefined => {
  const url = new URL(window.location.href)
  const search = new URLSearchParams(url.search)
  const from = search.get(SearchParams.FromId)
  const to = search.get(SearchParams.ToId)
  const fromName = search.get(SearchParams.FromName)
  const toName = search.get(SearchParams.ToName)

  if (!from || !to || !fromName || !toName) return
  return {
    urlBaseCurrency: {
      currencyCode: from,
      currencyName: fromName
    },
    urlCompareToCurrency: {
      currencyCode: to,
      currencyName: toName
    }
  }
}

const generateSearch = (fromCurrency: Currency, toCurrency: Currency): string => {
  const url = new URL(window.location.href)
  const search = new URLSearchParams(url.search)

  search.set(SearchParams.FromId, fromCurrency.currencyCode)
  search.set(SearchParams.ToId, toCurrency.currencyCode)
  search.set(SearchParams.FromName, fromCurrency.currencyName)
  search.set(SearchParams.ToName, toCurrency.currencyName)
  return search.toString()
}
