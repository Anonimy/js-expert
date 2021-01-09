'use strict'

const Event = require('events')
const event = new Event()
const eventName = 'counter'
event.on(eventName, msg => console.log('counter updated:', msg))

const myCounter = {
    counter: 0
}
const myCounterProxy = new Proxy(myCounter, {
    set: (target, propertyKey, newValue) => {
        event.emit(eventName, { newValue, key: target[propertyKey] })
        target[propertyKey] = newValue
        return true
    },
    get: (target, prop) => target[prop]
})

setInterval(function () {
    console.log('[3]: setInterval')
    myCounterProxy.counter += 1
    if (myCounterProxy.counter === 10) {
        clearInterval(this)
    }
}, 200)

// insere uma função na call stack com 0 milisegundos, o que faz com que seja a próxima chamada da call stack
// também é considerado má prática, mas é bem mais utilizado nas aplicações por aí
setTimeout(() => {
    console.log('[1]: setTimeout')
    myCounterProxy.counter = 4
}, 0)

// se quer que execute uma função imediata, pode-se utilizar o setImmediate
// na prática, tem praticamente o mesmo efeito que `setTimeout(fn,0)`, mas não é recomendado pelo Node e também existe a questão semântica
setImmediate(() => {
    console.log('[2]: setImmediate', myCounterProxy.counter)
})

// executa totalmente de imediato, mas, para isso, prejudica o ciclo de vida do Node.js
// porque ele paralisa as chamadas da call stack e invade o espaço da execução do que seria a próxima chamada
process.nextTick(() => {
    console.log('[0]: process.nextTick()')
    myCounterProxy.counter = 2
})
