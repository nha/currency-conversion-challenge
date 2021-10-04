import { useQuery } from 'react-query'

import { client } from '@/client'

export const useCompareCurrencies = (currencyCodeOne: string, currencyCodeTwo: string): string => {
  const compareResult = useQuery(['compare-currency', currencyCodeOne, currencyCodeTwo], () => client.get(''))
}
