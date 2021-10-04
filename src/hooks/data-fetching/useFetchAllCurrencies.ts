import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { capitalize } from 'lodash'

import { Currency } from '@/components/currency-dropdown/CurrencyOption'
import { client } from '@/client'

export const useFetchAllCurrencies = () => {
  const { data, ...allCurrenciesQueryResult } = useQuery('all-currency', () =>
    client.get<Record<string, string>>('/currencies.json')
  )

  const currencyOptions = useMemo<Currency[]>(() => {
    const rawCurrency = data?.data || {}
    return Object.entries(rawCurrency).map(([key, value]) => ({
      currencyCode: key,
      currencyName: splitAndCapitalize(value)
    }))
  }, [data])

  return {
    currencyOptions,
    ...allCurrenciesQueryResult
  }
}

const splitAndCapitalize = (currencyName: string): string => {
  const sectionedWords = currencyName.split(' ')
  const capitalizedWords = sectionedWords.map(word => capitalize(word))
  return capitalizedWords.join(' ')
}
