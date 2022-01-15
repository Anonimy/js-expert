import RickAndMortyBRLAdapter from './business/adapters/rickAndMortyBRLAdapter.js'
import RickAndMortyUSDAdapter from './business/adapters/rickAndMortyUSDAdapter.js'

const data = [
  RickAndMortyBRLAdapter,
  RickAndMortyUSDAdapter
].map(integration => integration.getCharacters())

const all = await Promise.allSettled(data)

const successes = all
  .filter(({ status }) => status === 'fulfilled')
  .map(({ value }) => value)
  .reduce((prev, next) => prev.concat(next), [])

const errors = all
  .filter(({ status }) => status === 'rejected')

console.table(successes)
console.table(errors)
