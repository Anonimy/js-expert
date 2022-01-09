export default class Order {
  constructor({ amount, customerId, products }) {
    this.amount = amount
    this.customerId = customerId
    this.products = products
  }
}
