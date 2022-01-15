import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import axios from 'axios'
import fs from 'fs/promises'
import RickAndMortyUSD from '../../src/business/integrations/rickAndMortyUSD.js'

describe('#RickAndMortyUSD', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('#getCharactersXML should return a list of Character Entities', async () => {
    const response = await fs.readFile('./test/mocks/characters.xml')
    const expected = [{"gender": "Male", "id": 10, "location": "Worldender's lair", "name": "Alan Rails", "origin": "unknown", "species": "Human", "status": "Dead", "type": "Superhuman (Ghost trains summoner)"}]
    jest.spyOn(axios, 'get').mockResolvedValue({ data: response })

    const result = await RickAndMortyUSD.getCharactersFromXML()
    expect(result).toMatchObject(expected)
  })

  test('#getCharactersXML should return an empty list', async () => {
    const response = await fs.readFile('./test/mocks/characters-empty.xml')
    const expected = []
    jest.spyOn(axios, 'get').mockResolvedValue({ data: response })

    const result = await RickAndMortyUSD.getCharactersFromXML()
    expect(result).toStrictEqual(expected)
  })
})
