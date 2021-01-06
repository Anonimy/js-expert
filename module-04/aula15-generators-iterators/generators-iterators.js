const assert = require('assert')

// Generators

function* calculation(arg1, arg2) {
    yield arg1 * arg2
}

function* main() {
    yield 'Hello'
    yield 'World'
    yield* calculation(20, 10)
}

const generator = main()
assert.deepStrictEqual(generator.next(), { value: 'Hello', done: false })
assert.deepStrictEqual(generator.next(), { value: 'World', done: false })
assert.deepStrictEqual(generator.next(), { value: 200, done: false })
assert.deepStrictEqual(generator.next(), { value: undefined, done: true })

assert.deepStrictEqual(Array.from(main()), [ 'Hello', 'World', 200 ])

assert.deepStrictEqual([...main()], [ 'Hello', 'World', 200 ])

// Async iterators

const { readFile, stat, readdir } = require('fs/promises')

function* promisified() {
    yield readFile(__filename)
    yield Promise.resolve('Hey Dude')
}

async function* systemInfo() {
    const file = await readFile(__filename)
    yield { file: file.toString() }

    const { size } = await stat(__filename)
    yield { size }

    const dir = await readdir(__dirname)
    yield { dir }
}

;(async () => {
    for await (const item of promisified()) {
        console.log('promisified item', item)
    }
})()
;(async () => {
    for await (const item of systemInfo()) {
        console.log('systemInfo item', item)
    }
})()
