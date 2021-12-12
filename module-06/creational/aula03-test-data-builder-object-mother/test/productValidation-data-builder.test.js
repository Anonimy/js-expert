const { expect } = require('chai')
const { it, describe } = require('mocha')
const { productValidator } = require('../src/index')
const ProductDataBuilder = require('./model/productDataBuilder')

describe('Test Data Builder', () => {
  it('should not return error with valid product', () => {
    const product = ProductDataBuilder.aProduct().build()
    const result = productValidator(product)

    const expected = {
      result: true,
      errors: [],
    }

    expect(result).to.be.deep.equal(expected)
  })

  describe('Product Validation Rules', () => {
    it('should return an object error when creating a Product with invalid id', () => {
      const product = ProductDataBuilder.aProduct().withInvalidId().build()
      const result = productValidator(product)

      const expected = {
        result: false,
        errors: ['id: invalid length (current [1] expected to have length between 2 and 20)'],
      }

      expect(result).to.be.deep.equal(expected)
    })
  
    it('should return an object error when creating a Product with invalid name', () => {
      const product = ProductDataBuilder.aProduct().withInvalidName().build()
      const result = productValidator(product)

      const expected = {
        result: false,
        errors: ['name: invalid value (current [abc123] expected to have words only)'],
      }

      expect(result).to.be.deep.equal(expected)
    })

    it('should return an object error when creating a Product with invalid price', () => {
      const product = ProductDataBuilder.aProduct().withInvalidPrice().build()
      const result = productValidator(product)

      const expected = {
        result: false,
        errors: ['price: invalid price (current [2000] expected to be between 1 and 1000)'],
      }

      expect(result).to.be.deep.equal(expected)
    })

    it('should return an object error when creating a Product with invalid category', () => {
      const product = ProductDataBuilder.aProduct().withInvalidCategory().build()
      const result = productValidator(product)

      const expected = {
        result: false,
        errors: ['category: invalid category (current [abc123] expected to be one of [eletronic, organic])'],
      }

      expect(result).to.be.deep.equal(expected)
    })
  })
})
