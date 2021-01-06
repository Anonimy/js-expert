const assert = require('assert')

const myMap = new Map()

// podem ter qualquer coisa como chave
myMap
    .set(1, 'one')
    .set('Erick', { text: 'two' })
    .set(true, () => 'hello')

// usando um constructor
const myMapWithConstructor = new Map([
    ['1', 'str1'],
    [1, 'num1'],
    [true, 'bool1']
])

assert.strictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('Erick'), { text: 'two' })
assert.strictEqual(myMap.get(true)(), 'hello')

// em Object as chaves só podem ser String ou Symbol, em Map pode ser qualquer coisa (claro que se for um Object, deve ser a mesma REFERÊNCIA de objeto)
const onlyByReference = { id: 1 }
myMap.set(onlyByReference, { name: 'MateusLarrubia' })

assert.strictEqual(myMap.get({ id: 1 }), undefined)
assert.deepStrictEqual(myMap.get(onlyByReference), { name: 'MateusLarrubia' })

// Map utils

// Size (ao invés de Object.keys(obj).length)
assert.strictEqual(myMap.size, 4)

// Has (ao invés de `obj.key === undefined` ou `obj.hasOwnProperty('key')`)
assert.ok(myMap.has(onlyByReference))

// Delete (ao invés de `delete obj.key`, que não é nada performático e pode ocasionar memory leak)
assert.ok(myMap.delete(true)) // o Map.prototype.delete retorna true ou false, dependendo se consegue remover a prop ou não
assert.strictEqual(myMap.size, 3)

// implementa o padrão de iterators
assert.deepStrictEqual([...myMap], [
    [1, 'one'],
    ['Erick', { text: 'two' }],
    [onlyByReference, { name: 'MateusLarrubia' }]
])

// implementa também o padrão de generators
// for (const [key, value] of myMap) {
//     console.log({ key, value })
// }

// Clear (ao invés de reassignar o Object -- `obj = {}` --, da pra limpar com esse método)
myMap.clear()
assert.strictEqual(myMap.size, 0)

// -=-=-=-=--=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=- //

// WeakMap

// os valores podem ser coletados mesmo após perder as referências (usado em casos bem específicos)

// tem a maioria dos benefícios do Map, mas não implementa o protocolo iterable e só retorna chaves de valor que você já tenha a referência (só aceita objetos como chave)
// porém também é mais leve e "memory-leak-safe"

const myWeakMap = new WeakMap()
const hero = { name: 'Flash' }

myWeakMap.set(hero, "DC's best hero")
assert.strictEqual(myWeakMap.has({ name: 'Flash' }), false)
assert.ok(myWeakMap.has(hero))

assert.strictEqual(myWeakMap.get(hero), "DC's best hero")

assert.ok(myWeakMap.delete(hero))
assert.strictEqual(myWeakMap.has(hero), false)
