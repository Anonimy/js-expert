# Anotações da aula 03

## Javascript Generators

- Retornado por _generator functions_ (sintaxe: `function* gen() { ... }`) e respeita tanto o **_iterable protocol_** quanto o **_iterator protocol_**.
```js
function* gen() {
    yield 1;
    yield 2;
    yield 3;
}

var g = gen(); // "Generator { }"
```

- Possui os métodos de instância:
    - `Generator.prototype.next()`
        - Retorna um valor passado pela expressão `yield`.
    - `Generator.prototype.return()`
        - Retorna um valor dado e finaliza o generator.
    - `Generator.prototype.throw()`
        - Joga um erro para um generator.
```js
console.log(g.next().value); // 1
console.log(g.next().value); // 2
console.log(g.next().value); // 3
```

- A expressão `yield*` (com um asterisco no final) serve para delegar uma seguinte execução do próprio generator ou para outro iterable. Exemplo:
```js
function* g1() {
  yield 2;
  yield 3;
  yield 4;
}

function* g2() {
  yield 1;
  yield* g1(); // Delega a execução para g1(), que é uma instância de Generator, que é iterable.
  yield 5;
}

var iterator = g2();

console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: 4, done: false}
console.log(iterator.next()); // {value: 5, done: false}
console.log(iterator.next()); // {value: undefined, done: true}
```
