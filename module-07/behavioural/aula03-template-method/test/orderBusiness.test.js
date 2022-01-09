import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import OrderBusiness from '../src/business/orderBusiness.js'
import Order from '../src/entities/order.js'

describe('Test suite for Template Method pattern', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  describe('#OrderBusiness', () => {
    test('executing OrderBusiness without Template Method', () => {
      const order = new Order({
        customerId: 1,
        amount: 100000,
        products: [{ description: 'tesla' }]
      })

      const orderBusiness = new OrderBusiness()
      // Todos os devs terão de lembrar de obrigatoriamente seguir à risca esse fluxo de execução
      // se algum esquecer de chamar a função de validação, pode quebrar todo o sistema
      const isValid = orderBusiness._validateRequiredFields(order)
      expect(isValid).toBe(true)

      const result = orderBusiness._create(order)
      expect(result).toBe(true)
    })

    test('executing OrderBusiness with Template Method', () => {
      const order = new Order({
        customerId: 2,
        amount: 100000,
        products: [{ description: 'tesla' }]
      })

      const orderBusiness = new OrderBusiness()

      const calledValidationFn = jest.spyOn(
        orderBusiness,
        orderBusiness._validateRequiredFields.name
      )

      const calledCreateFn = jest.spyOn(
        orderBusiness,
        orderBusiness._create.name
      )
      // com template method, a sequência de passos é sempre executada
      // e evita a replicação de lógica
      const result = orderBusiness.create(order)
      expect(result).toBe(true)
      expect(calledValidationFn).toHaveBeenCalled()
      expect(calledCreateFn).toHaveBeenCalled()
    })
  })
})
