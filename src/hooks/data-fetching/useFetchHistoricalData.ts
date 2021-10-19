import { useQueries, UseQueryResult, UseQueryOptions } from 'react-query'
import subWeeks from 'date-fns/subWeeks'
import format from 'date-fns/format'

import { client, generatePathUrlForCurrencyConversion } from '@/client'
import { CacheKeys } from './keys'
import { ConversionResult } from './'

export const useFetchHistoricalTrends = (currencyCodeOne?: string, currencyCodeTwo?: string) => {
  const previousWeeks = findPreviousDates()
  const queries: UseQueryOptions[] = previousWeeks.map(date => ({
    enabled: !!currencyCodeOne && !!currencyCodeTwo,
    queryKey: [CacheKeys.HistoricalTrend, date],
    queryFn: async () => {
      if (!currencyCodeTwo || !currencyCodeOne) return
      const requestPath = generatePathUrlForCurrencyConversion(currencyCodeOne, currencyCodeTwo, date)
      const { data } = await client.get<ConversionResult>(requestPath)
      const exchangeRate = data[currencyCodeTwo]
      if (!exchangeRate && typeof exchangeRate !== 'number') throw new Error('Could not determine exchange rate')
      return {
        lastUpdatedAt: data.date,
        exchangeRate
      }
    }
  }))

  const results = useQueries(queries) as UseQueryResult<HistoricalExchangeResult>[]

  const isLoading = !!results.find(({ isLoading }) => isLoading)
  const lastUpdatedAts: string[] = []
  const exchangeRates: number[] = []
  for (const response of results) {
    if (!response.data) continue
    lastUpdatedAts.push(response.data.lastUpdatedAt)
    exchangeRates.push(response.data.exchangeRate)
  }

  return {
    lastUpdatedAts,
    exchangeRates,
    isLoading
  }
}

const findPreviousDates = (numberOfWeeksToGoBack: number = 15) => {
  const formattedWeeks: string[] = []
  for (let index = 0; index <= numberOfWeeksToGoBack; index++) {
    const now = new Date()
    const previousWeek = subWeeks(now, index + 1)
    formattedWeeks.push(format(previousWeek, 'yyyy-MM-dd'))
  }
  return formattedWeeks
}

interface HistoricalExchangeResult {
  lastUpdatedAt: string
  exchangeRate: number
}
