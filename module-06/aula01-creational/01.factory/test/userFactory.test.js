const rewiremock = require('rewiremock/node')
const { deepStrictEqual } = require('assert')

// it could be in another file
const dbData = [{ name: 'João' }, { name: 'Maria' }]
class MockDatabase {
  connect = () => this
  find = async (_query) => dbData
}

rewiremock(() => require('../src/util/database')).with(MockDatabase)

;(async () => {
  {
    const expected = [{ name: 'JOÃO' }, { name: 'MARIA' }]
    rewiremock.enable()
    const UserFactory = require('../src/factory/userFactory')
    const userFactory = await UserFactory.createInstance()
    const results = await userFactory.find()
    deepStrictEqual(results, expected)
    rewiremock.disable()
  }
})()
