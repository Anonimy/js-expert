import OrderBusiness from './business/orderBusiness.js'
import Order from './entities/order.js'

const order = new Order({
  customerId: 'abc123',
  amount: 200000,
  products: [{ description: 'shampoo' }]
})

const orderBusiness = new OrderBusiness()
console.info('orderCreated', orderBusiness.create(order))
