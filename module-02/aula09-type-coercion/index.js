const { types } = require("util")

true + 2 // 3
'21' + true // "21true"
'21'-true // 20
9999999999999999 // 10000000000000000 <-- 16 dígitos 9, viram 1 + 16 zeros
0.1 + 0.2 // 0.30000000000000004

// -------------------------------- //

console.assert(String(123) === '123', 'explicit conversion to String')
console.assert(123 + '' === '123', 'implicit conversion to String')

console.assert(('hello' || 123) === 'hello', '|| returns the first truthy element')
console.assert((null || 123) === 123, '|| returns the first truthy element')

console.assert(('hello' && 123) === 123, '&& returns the next element if the previous is truthy')
console.assert((null && 123) === null, '&& returns the next element if the previous is truthy')

// -------------------------------- //

const item = {
    name: 'Mateus Larrubia',
    age: 21,
    toString() { // String: chama primeiro e, se o retorno nao for primitivo, chama o valueOf()
        return `${this.name}, ${this.age}`
    },
    valueOf() { // Number: chama primeiro e, se o retorno nao for primitivo, chama o toString()
        return 9
    }
}
console.assert(String(item) === 'Mateus Larrubia, 21', 'explicit conversion to String (should call toString)')
console.assert(item + '' === '9', 'implicit conversion to String (should call valueOf)')
console.assert(`${item}` === 'Mateus Larrubia, 21', 'implicit conversion using Template Strings (should call toString)')
console.assert(Number(item) === 9, 'explicit conversion to Number (should call valueOf)')
console.assert(item + 0 === 9, 'implicit conversion to Number (should call valueOf)')

const item2 = {
    name: 'Mateus Larrubia',
    age: 21,
    toString() {
        return `${this.name}, ${this.age}`
    },
    valueOf() {
        return 9
    },
    [Symbol.toPrimitive](coercionType) { // essa prop tem prioridade tanto sobre toString quanto sobre valueOf
        // console.log('coercionType', coercionType)
        const types = {
            string: JSON.stringify(this),
            number: 9
        }
        return types[coercionType] || types.string
    }
}
console.assert(String(item2) === '{"name":"Mateus Larrubia","age":21}', 'explicit conversion to String (coercionType should be "string")')
console.assert(item2 + '' === '{"name":"Mateus Larrubia","age":21}', 'implicit conversion to String (coercionType should be "default")')
console.assert(`${item2}` === '{"name":"Mateus Larrubia","age":21}', 'implicit conversion using Template Strings (coercionType should be "string")')
console.assert(Number(item2) === 9, 'explicit conversion to Number (coercionType should be "number")')
console.assert(item2 + 0 === '{"name":"Mateus Larrubia","age":21}0', 'implicit conversion to Number (coercionType should be "default")')

const item3 = { ...item2, name: 'Anonimy', age: 52 }
console.assert(!!item3[Symbol.toPrimitive], '[Symbol.toPrimitive] should be an existing function, since it is implemented in item2')
