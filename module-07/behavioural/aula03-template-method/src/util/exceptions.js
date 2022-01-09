class NotImplementedException extends Error {
  constructor(message) {
    super(`${message} is not implemented`)
    this.name = 'NotImplementedException'
  }
}

export { NotImplementedException }
