const { describe, it } = require('mocha')
const { expect } = require('chai')
const { evaluateRegex, InvalidRegexError } = require('../src/utils')

describe('utils', () => {
    it('evaluateRegex should throw an error when using an unsafe regex', () => {
        const unsafeRegex = /^(\w+\s?)+$/gmi
        expect(() => evaluateRegex(unsafeRegex)).to.throw(InvalidRegexError, `This ${unsafeRegex} is unsafe`)
    })

    it('evaluateRegex should work properly when using a safe regex', () => {
        const safeRegex = /^cat$/
        expect(() => evaluateRegex(safeRegex)).not.to.throw()
        expect(evaluateRegex(safeRegex)).to.be.ok
    })
})
