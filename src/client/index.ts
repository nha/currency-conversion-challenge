import axios from 'axios'

const baseURL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1'

export const client = axios.create({
  baseURL
})

/** Generates the path URL for comparing currencies. Currency one will be compared against currency 2.
 * @explanation If `currencyOne` is `eur` and `currencyTwo` is `jpy`, this will return the amount of `jpy` equal to one `eur`
 */
export const generatePathUrlForCurrencyConversion = (
  currencyOne: string,
  currencyTwo: string,
  date: string = 'latest'
): string => `/${date}/currencies/${currencyOne}/${currencyTwo}.json`
