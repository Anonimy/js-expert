const assert = require('assert')

// usado na maioria das vezes para uma lista de itens únicos
const arr1 = ['0', '1', '2']
const arr2 = ['2', '0', '3']
const arr3 = arr1.concat(arr2)
assert.deepStrictEqual(arr3.sort(), ['0', '0', '1', '2', '2', '3'])

const mySet = new Set()
arr1.map(item => mySet.add(item))
arr2.map(item => mySet.add(item))
assert.deepStrictEqual(Array.from(mySet), ['0', '1', '2', '3'])
