import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import RickAndMortyBRLAdapter from '../../src/business/adapters/rickAndMortyBRLAdapter.js'
import RickAndMortyBRL from '../../src/business/integrations/rickAndMortyBRL.js'

describe('#RickAndMortyBRLAdapter', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('#getCharacters should be an adapter for RickAndMortyBRL.getCharactersFromJSON', async () => {
    const brlIntegration = jest.spyOn(RickAndMortyBRL, RickAndMortyBRL.getCharactersFromJSON.name).mockResolvedValue([])
    const result = await RickAndMortyBRLAdapter.getCharacters()
    expect(result).toEqual([])
    expect(brlIntegration).toHaveBeenCalled()
  })
})
