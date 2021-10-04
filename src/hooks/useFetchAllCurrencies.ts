import { useQuery } from 'react-query'

import { client } from '@/client'

export const useFetchAllCurrencies = () => {
  const { data, ...allCurrenciesQueryResult } = useQuery('all-currency', () =>
    client.get<Record<string, string>>('/currencies.json')
  )
  console.log('data', data)
  return {
    currencyMap: data?.data || {},
    ...allCurrenciesQueryResult
  }
}
