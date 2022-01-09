import BaseBusiness from './base/baseBusiness.js'

export default class OrderBusiness extends BaseBusiness {
  #order = new Set()

  _validateRequiredFields(data) {
    return data.amount > 0 && Array.isArray(data.products) && data.products.length > 0
  }

  _create(data) {
    this.#order.add(data)
    return true
  }
}
