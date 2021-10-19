import { useMemo } from 'react'
import { useQuery } from 'react-query'
import capitalize from 'lodash.capitalize'

import { Currency } from '@/features/currency-dropdown/CurrencyOption'
import { client } from '@/client'
import { CacheKeys } from './keys'

export const useFetchAllCurrencies = () => {
  const { data, ...allCurrenciesQueryResult } = useQuery(
    CacheKeys.AllCurrencies,
    () => client.get<Record<string, string>>('/latest/currencies.json'),
    {
      staleTime: twentyFourHoursInMs
    }
  )

  const currencyOptions = useMemo<Currency[]>(() => {
    const rawCurrency = data?.data || {}
    return Object.entries(rawCurrency).map(([key, value]) => ({
      currencyCode: key,
      currencyName: splitAndCapitalize(value)
    }))
  }, [data])

  return {
    currencyMap: data?.data || {},
    currencyOptions,
    ...allCurrenciesQueryResult
  }
}

/** Some currencies are not capitalized by the API such as `US dollar`. I prefer them all to capitalized,
 * so this converts all the names into the equivalent of `US Dollar`
 * @example splitAndCapitalize('US dollar') --> 'US Dollar'
 * */
const splitAndCapitalize = (currencyName: string): string => {
  const sectionedWords = currencyName.split(' ')
  const capitalizedWords = sectionedWords.map(word => capitalize(word))
  return capitalizedWords.join(' ')
}

export const twentyFourHoursInMs = 1000 * 60 * 60 * 24
