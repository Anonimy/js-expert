const assert = require('assert');
const sinon = require('sinon');
const Fibonacci = require('./fibonacci');

;(async () => {
    {
        const fibonacci = new Fibonacci();
        const spy = sinon.spy(fibonacci, fibonacci.execute.name);
        for await(const yieldValue of fibonacci.execute(3)) {
            // Pode-se usar for-await(...) para segurar a execução do programa até que o Generator tenha sido finalizado e pegar cada yield
            // console.log(yieldValue);
        }
        const expectedCallCount = 4;
        assert.strictEqual(spy.callCount, expectedCallCount);
    }
    {
        const fibonacci = new Fibonacci();
        const spy = sinon.spy(fibonacci, fibonacci.execute.name);
        const [...results] = fibonacci.execute(3); // Pode-se usar rest/spread para segurar a execução do programa até que o Generator tenha sido finalizado e pegar os yields
        const expectedCallCount = 4;
        assert.strictEqual(spy.callCount, expectedCallCount);
    }
    {
        const fibonacci = new Fibonacci();
        const spy = sinon.spy(fibonacci, fibonacci.execute.name);
        const [...results] = fibonacci.execute(5);
        // [0] input = 5, current = 0, next = 1
        // [1] input = 4, current = 1, next = 1
        // [2] input = 3, current = 1, next = 2
        // [3] input = 2, current = 2, next = 3
        // [4] input = 1, current = 3, next = 5
        // [5] input = 0 -> FINALIZA

        const { args } = spy.getCall(2);
        const expectedResult = [0, 1, 1, 2, 3];
        const expectedParams = Object.values({ input: 3, current: 1, next: 2 });

        assert.deepStrictEqual(results, expectedResult);
        assert.deepStrictEqual(args, expectedParams);
    }
})();
