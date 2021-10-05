import { useQuery } from 'react-query'

import { client, generatePathUrlForCurrencyConversion } from '@/client'
import { CacheKeys } from './keys'

export const useCompareCurrencies = (currencyCodeOne?: string, currencyCodeTwo?: string) => {
  const compareResult = useQuery(
    // Whenever any of these values change, the request will automatically be re-ran
    [CacheKeys.CompareCurrency, currencyCodeOne, currencyCodeTwo],
    async () => {
      // This case should never happen, since the query will not run if either is falsy. It is here mainly to appease TS.
      if (!currencyCodeTwo || !currencyCodeOne) return

      const requestPath = generatePathUrlForCurrencyConversion(currencyCodeOne, currencyCodeTwo)
      const { data } = await client.get<ConversionResult>(requestPath)
      const exchangeRate = data[currencyCodeTwo]
      if (!exchangeRate && typeof exchangeRate !== 'number') throw new Error('Could not determine exchange rate')
      return {
        lastUpdatedAt: data.date,
        exchangeRate
      }
    },
    {
      enabled: !!currencyCodeOne && !!currencyCodeTwo
    }
  )

  return compareResult
}

type ConversionResult = {
  /** The date is was last updated
   * @format yyyy-mm-dd
   * */
  date: string
} & {
  /** The key is the 3 character name of the currency, lower cased, the value being the conversion rate.
   * @example `usd`, `eur` */
  [key: string]: number
}
