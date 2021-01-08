'use strict'

const assert = require('assert')

// O objetivo do Reflect é garantir a semântica e a segurança em objetos

// Apply //
const myObj = {
    add(myValue) {
        return this.arg1 + this.arg2 + myValue
    }
}

assert.strictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130)

// um problema que poderia passar (mas é raro) com um módulo malicioso
// Function.prototype.apply = () => { throw new TypeError('mwahaha') }

// outro problema (que é mais comum!)
myObj.add.apply = function () { throw new TypeError('mwahahah sou mais comum') }

assert.throws(() => myObj.add.apply({}, []), {
    name: 'TypeError',
    message: 'mwahahah sou mais comum'
})

// Agora usando Reflect com Apply:
const result = Reflect.apply(myObj.add, { arg1: 20, arg2: 40 }, [200])
assert.strictEqual(result, 260)

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- //

// DefineProperty //

// Mais uma questão semântica do que de segurança

// para definir uma prop de uma Function no JS "regular":
function MyDate(){}
Object.defineProperty(MyDate, 'withObject', { value: () => 'Hello, world!' })

// Agora usando Reflect com DefineProperty:
Reflect.defineProperty(MyDate, 'withReflection', { value: () => 'Hello, upside down!' })

assert.deepStrictEqual(MyDate.withObject(), 'Hello, world!')
assert.deepStrictEqual(MyDate.withReflection(), 'Hello, upside down!')

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- //

// DeleteProperty //

// Com JS "regular", usávamos a palavra chave reservada `delete`
const withDelete = { user: 'anonimy' }
delete withDelete.user // IMPERFORMÁTICO e pode gerar MEMORY LEAK, deve-se tentar ao máximo evitar esse approach

assert.strictEqual(withDelete.hasOwnProperty('user'), false)


// Agora usando Reflect com DeleteProperty:
const withReflection = { user: 'mlarrubia' }
Reflect.deleteProperty(withReflection, 'user')

assert.strictEqual(withReflection.hasOwnProperty('user'), false)

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- //

// Get //

// Também é mais uma questão semântica (e de certa forma garantir a confiabilidade dos tipos)

// Por exemplo, deveríamos fazer um get somente em instâncias de referência (Object, ArrayLikes, etc.)
assert.strictEqual(1['userName'], undefined) // <-- é esquisito, deveria dar um erro

// Agora usando Reflect com Get, ele vai lançar uma exception!
assert.throws(() => Reflect.get(1, 'userName'), TypeError)

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- //

// Has //

// Também é mais uma questão semântica, mas vai a gosto
assert.ok('superman' in { superman: 1 })
assert.ok(Reflect.has({ batman: 2 }, 'batman'))

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- //

// OwnKeys //

// É uma questão de praticidade para buscar tanto props/keys String quanto Symbol
const user = Symbol('user') 
const myObj2 = {
    id: 1,
    [Symbol.for('password')]: 123,
    [user]: 'mlarrubia',
}

// Com o javascript "regular", precisamos chamar dois métodos distintos para ter as duas informações
const objectKeys = [
    ...Object.getOwnPropertyNames(myObj2),
    ...Object.getOwnPropertySymbols(myObj2)
]
assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user])

// Agora usando Reflect com OwnKeys
assert.deepStrictEqual(Reflect.ownKeys(myObj2), ['id', Symbol.for('password'), user])
