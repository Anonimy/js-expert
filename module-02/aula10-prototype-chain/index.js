const assert = require('assert');

const obj = {}
const arr = []
const fn = () => {}

// internamente, objetos literais viram funções explicitas
assert.deepStrictEqual(new Object().__proto__, {}.__proto__)

// __proto__ é a referencia do objeto que possui as propriedades nele
assert.deepStrictEqual(obj.__proto__, Object.prototype)
assert.deepStrictEqual(arr.__proto__, Array.prototype)
assert.deepStrictEqual(fn.__proto__, Function.prototype)

// o __proto__ de Object é null
assert.deepStrictEqual(obj.__proto__.__proto__, null)

// ---------------------------------------- //

function Employee() {}
Employee.prototype.salary = () => 'salary**'

function Supervisor() {}
// herda a instancia de Employee <-- "hereditariedade a la ES5"
Supervisor.prototype = Object.create(Employee.prototype)
Supervisor.prototype.profitShare = () => 'profitShare**'

function Manager() {}
Manager.prototype = Object.create(Supervisor.prototype)
Manager.prototype.monthlyBonuses = () => 'monthlyBonuses**'

// se nao chamar o 'new', o primeiro __proto__ vai ser sempre a instancia
// de Function, sem herdar nossas classes
assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype)
assert.deepStrictEqual(Manager.prototype.__proto__.__proto__, Employee.prototype)
assert.deepStrictEqual(Manager.prototype.__proto__.__proto__.__proto__, Object.prototype)
assert.deepStrictEqual(Manager.prototype.__proto__.__proto__.__proto__.__proto__, null)

// quando chamamos o 'new', o __proto__ recebe o prototype da propria classe
assert.deepStrictEqual(new Manager().__proto__, Manager.prototype)
assert.deepStrictEqual(new Manager().__proto__.__proto__, Supervisor.prototype)
assert.deepStrictEqual(new Manager().__proto__.__proto__.__proto__, Employee.prototype)
assert.deepStrictEqual(new Manager().__proto__.__proto__.__proto__.__proto__, Object.prototype)
assert.deepStrictEqual(new Manager().__proto__.__proto__.__proto__.__proto__.__proto__, null)

// ---------------------------------------- //

class T1 {
    ping() {
        return 'ping'
    }
}

class T2 extends T1 {
    pong() {
        return 'pong'
    }
}

class T3 extends T2 {
    shoot() {
        return 'shoot'
    }
}

const t3 = new T3()
assert.strictEqual(t3.ping(), 'ping')
assert.strictEqual(t3.pong(), 'pong')
assert.strictEqual(t3.shoot(), 'shoot')

assert.deepStrictEqual(t3.__proto__, T3.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__, T2.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__, Object.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__.__proto__, null)
