/**
 * ProductID: should have between 2 and 20 characters
 * Name: should be words only
 * Price: should be between 0 and 1000
 * Category: should be one of [eletronic, organic]
 */

function productValidator(product) {
  const errors = []

  if (product.id.length < 2 || product.id.length > 20) {
    errors.push(`id: invalid length (current [${product.id}] expected to have length between 2 and 20)`)
  }

  if (/(?:\W|\d)/.test(product.name)) {
    errors.push(`name: invalid value (current [${product.name}] expected to have words only)`)
  }

  if (product.price < 1 || product.price > 1000) {
    errors.push(`price: invalid price (current [${[product.price]}] expected to be between 1 and 1000)`)
  }

  if (!['eletronic', 'organic'].includes(product.category)) {
    errors.push(`category: invalid category (current [${product.category}] expected to be one of [eletronic, organic])`)
  }

  return {
    result: errors.length === 0,
    errors,
  }
}

module.exports = {
  productValidator
}