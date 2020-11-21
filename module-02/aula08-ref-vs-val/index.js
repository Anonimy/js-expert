const { deepStrictEqual } = require('assert');
const assert = require('assert');

let counter = 0;
let counter2 = counter;
counter2++;

// tipo primitivo gera uma cópia em memória
assert.deepStrictEqual(counter, 0);
assert.deepStrictEqual(counter2, 1);

// ---------------------------------------------- //

const item = { counter: 0 };
const item2 = item;

// tipo de referencia copia o endereço de memoria
// e aponta para o mesmo lugar
item.counter++;
deepStrictEqual(item, { counter: 1 });
item2.counter++;
deepStrictEqual(item2, { counter: 2 });
