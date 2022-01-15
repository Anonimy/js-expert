import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import RickAndMortyUSDAdapter from '../../src/business/adapters/rickAndMortyUSDAdapter.js'
import RickAndMortyUSD from '../../src/business/integrations/rickAndMortyUSD.js'

describe('#RickAndMortyUSDAdapter', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('#getCharacters should be an adapter for RickAndMortyUSD.getCharactersFromXML', async () => {
    const usdIntegration = jest.spyOn(RickAndMortyUSD, RickAndMortyUSD.getCharactersFromXML.name).mockResolvedValue([])
    const result = await RickAndMortyUSDAdapter.getCharacters()
    expect(result).toEqual([])
    expect(usdIntegration).toHaveBeenCalled()
  })
})
