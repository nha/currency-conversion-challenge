/** All of the possible query keys. This exists so it will be easy to reference the key without having to retype the key as a string.
 *  Retyping the key is prone to spelling mistakes, and you have to remember what it was in the first place.
 * A common use case for needing the key more than once is invalidating the query when something is updated. That is not being done here, but is common in other apps.
 */
export enum CacheKeys {
  AllCurrencies = 'all-currencies',
  CompareCurrency = 'compare-currency'
}
