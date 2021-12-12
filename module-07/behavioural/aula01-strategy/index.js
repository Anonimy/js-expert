import ContextStrategy from "./src/base/contextStrategy.js"
import MongoDBStrategy from "./src/strategies/mongoDBStrategy.js"
import PostgresStrategy from "./src/strategies/postgresStrategy.js"

const postgresConnectionString = "postgres://mlarrubia:@admin0001@localhost:5432/heroes"
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString))
await postgresContext.connect()

const mongoDbConnectionString = "mongodb://mlarrubia:admin0001@localhost:27017/heroes"
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoDbConnectionString))
await mongoDBContext.connect()

const data = [
  {
    name: 'mateuslarurbia',
    type: 'transaction'
  },
  {
    name: 'mariasilva',
    type: 'activitylog'
  }
]

const contextTypes = {
  transaction: postgresContext,
  activitylog: mongoDBContext
}

for (const { name, type } of data) {
  const context = contextTypes[type]
  await context.create({ name: name + Date.now() })

  console.log(type, context.dbStrategy.constructor.name)
  console.log(await context.read())
}

// await postgresContext.create({ name: data[0].name })
// await mongoDBContext.create({ name: data[1].name })
// console.log(await mongoDBContext.read())
