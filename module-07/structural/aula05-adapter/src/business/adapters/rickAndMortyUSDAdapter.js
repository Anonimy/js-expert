import RickAndMortyUSD from '../integrations/rickAndMortyUSD.js'

export default class RickAndMortyUSDAdapter {
  static async getCharacters() {
    return RickAndMortyUSD.getCharactersFromXML()
  }
}
