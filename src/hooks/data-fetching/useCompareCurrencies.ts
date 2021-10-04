import { useQuery } from 'react-query'

import { client, generatePathUrlForCurrencyConversion } from '@/client'

export const useCompareCurrencies = (currencyCodeOne?: string, currencyCodeTwo?: string) => {
  const compareResult = useQuery(
    ['compare-currency', currencyCodeOne, currencyCodeTwo],
    async () => {
      if (!currencyCodeTwo || !currencyCodeOne) return
      const requestPath = generatePathUrlForCurrencyConversion(currencyCodeOne, currencyCodeTwo)
      const { data } = await client.get<Record<string, string | number>>(requestPath)
      const exchangeRate = data[currencyCodeTwo] as number
      if (!exchangeRate && typeof exchangeRate !== 'number') throw new Error('Could not determine exchange rate')
      return {
        lastUpdatedAt: data.date as string,
        exchangeRate
      }
    },
    {
      enabled: !!currencyCodeOne && !!currencyCodeTwo
    }
  )

  return compareResult
}
