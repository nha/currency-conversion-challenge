import { useContext } from 'react'
import { useInput } from '@caldwell619/react-hooks'
import getSymbolFromCurrency from 'currency-symbol-map'

import { useFetchAllCurrencies, useCompareCurrencies } from '@/hooks'
import { ChosenCurrency } from '@/providers'

const amountRegex = new RegExp(/^[0-9]{1,9}$/)
export const useCurrencySelections = () => {
  const { baseCurrency, compareToCurrency } = useContext(ChosenCurrency)
  const [amount, amountBind, { doesPass }] = useInput(getPrevAmountFromUrl(), setAmountToUrl, amountRegex)
  const { currencyOptions, isLoading: isAllCurrenciesLoading, error: fetchAllCurrenciesError } = useFetchAllCurrencies()

  const {
    data: { exchangeRate, lastUpdatedAt } = {},
    isLoading: isComparisonLoading,
    error: compareCurrencyError
  } = useCompareCurrencies(baseCurrency?.currencyCode, compareToCurrency?.currencyCode)

  const currencySymbol = getSymbolFromCurrency(baseCurrency?.currencyCode || '') || baseCurrency?.currencyCode || ''

  return {
    amount,
    doesAmountPass: doesPass,
    amountBind,
    isComparisonLoading,
    isAllCurrenciesLoading,
    compareCurrencyError,
    fetchAllCurrenciesError,
    currencyOptions,
    exchangeRate,
    lastUpdatedAt,
    currencySymbol
  }
}

const amountKey = 'amount'
const setAmountToUrl = (amount: string) => {
  const url = new URL(window.location.href)
  const search = new URLSearchParams(url.search)
  console.log('running', amount)
  search.set(amountKey, amount)
  window.history.replaceState({}, '', `${window.location.pathname}?${search.toString()}`)
}
const getPrevAmountFromUrl = (): string => {
  const url = new URL(window.location.href)
  const search = new URLSearchParams(url.search)
  return search.get(amountKey) || ''
}
