import MongoDB from 'mongodb'

export default class MongoDBStrategy {
  #instance
  constructor(connectionString) {
    const { pathname: dbName } = new URL(connectionString)
    this.connectionString = connectionString.replace(dbName, '')
    this.dbName = dbName.replace(/\W/g, '')
    this.collection = 'warriors'
  }

  async connect() {
    const client = new MongoDB.MongoClient(this.connectionString, {
      useUnifiedTopology: true
    })
    await client.connect()
    const db = client.db(this.dbName).collection(this.collection)
    this.#instance = db
  }

  async create(item) {
    return this.#instance.insertOne(item)
  }

  async read(query) {
    return this.#instance.find(query).toArray()
  }
}