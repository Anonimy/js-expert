const assert = require('assert')

// Keys
const uniqueKey = Symbol('userName')
const user = {}

user['username'] = 'value for normal (string) key'
user[uniqueKey] = 'value for symbol key'

assert.strictEqual(user.username, 'value for normal (string) key')

// Sempre unique em nivel de memoria
assert.strictEqual(user[Symbol('userName')], undefined)
assert.strictEqual(user[uniqueKey], 'value for symbol key')

// É mais dificil de pegar, mas NÃO é secreto!
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

// Bypass - má prática
user[Symbol.for('password')] = 1234
assert.strictEqual(user[Symbol.for('password')], 1234)

// Well known Symbols
const obj = {
    [Symbol.iterator]: () => ({
        items: ['c', 'b', 'a'],
        next() {
            return {
                done: this.items.length === 0,
                value: this.items.pop()
            }
        }
    })
}

assert.deepStrictEqual([...obj], ['a', 'b', 'c'])

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=- //

const kItems = Symbol('kItems')
class MyDates {
    constructor(...args) {
        this[kItems] = args.map(arg => new Date(...arg))
    }

    [Symbol.toPrimitive](coertionType) {
        if (coertionType !== 'string') throw new TypeError()
        const items = this[kItems].map(item => new Intl.DateTimeFormat('pt-BR', { month: 'long', day: '2-digit', year: 'numeric' }).format(item))
        return new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' }).format(items)
    }

    *[Symbol.iterator]() {
        for (const item of this[kItems]) {
            yield item
        }
    }

    async *[Symbol.asyncIterator]() {
        const timeout = ms => new Promise(r => setTimeout(r, ms))
        for (const item of this[kItems]) {
            await timeout(100)
            yield item.toISOString()
        }
    }

    get [Symbol.toStringTag]() {
        return 'MyDates'
    }
}

const myDate = new MyDates([2020, 3, 1], [2018, 2, 2])
const expectedDates = [
    new Date(2020, 3, 1),
    new Date(2018, 2, 2)
]

assert.strictEqual(Object.prototype.toString.call(myDate), '[object MyDates]')
assert.throws(() => myDate + 1, TypeError)

// coerçao explicita para chamar o toPrimitive
assert.strictEqual(String(myDate), '01 de abril de 2020 e 02 de março de 2018')

// implementar o iterator
assert.deepStrictEqual([...myDate], expectedDates)

;(async () => {
    const dates = []
    for await (const date of myDate) { dates.push(date) }
    const expectedDatesInISOString = expectedDates.map(date => date.toISOString())
    assert.deepStrictEqual(dates, expectedDatesInISOString)
})()