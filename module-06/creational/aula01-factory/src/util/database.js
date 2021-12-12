class Database {
  constructor({ connectionString }) {
    this.connectionString = connectionString
  }

  async sleep(ms) {
    return new Promise(resolve => {
      const t = setTimeout(() => {
        resolve()
        clearTimeout(t)
      }, ms)
    })
  }

  async connect() {
    await this.sleep(100)
    return this
  }

  async find(query) {
    await this.sleep(100)
    return [{ name: 'Mateus' }]
  }
}

module.exports = Database
