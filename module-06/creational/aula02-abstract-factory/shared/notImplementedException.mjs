export default class NotImplementedException extends Error {
  constructor(message) {
    super(`The "${message}" function was not implemented`)
    this.name = 'NotImplementedException'
  }
}