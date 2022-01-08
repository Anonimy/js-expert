import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals'
import Payment from '../src/events/payment.js'
import Marketing from '../src/observers/marketing.js'
import Shipping from '../src/observers/shipping.js'
import PaymentSubject from '../src/subjects/paymentSubject.js'

describe('Test suite for Observer Pattern', () => {
  beforeAll(() => {
    jest.spyOn(console, console.log.name).mockImplementation(() => {})
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  test('#PaymentSubject notify observables', () => {
    const subject = new PaymentSubject()
    const observer = {
      update: jest.fn()
    }
    const data = 'hello, world'
    const expected = data
    subject.subscribe(observer)
    subject.notify(data)
    expect(observer.update).toBeCalledWith(expected)
  })

  test('#PaymentSubject should not notify unsubscribed observers', () => {
    const subject = new PaymentSubject()
    const observer = {
      update: jest.fn()
    }
    const data = 'hello, world'
    subject.subscribe(observer)
    subject.unsubscribe(observer)
    subject.notify(data)
    expect(observer.update).not.toHaveBeenCalled()
  })

  test('#Payment should notify subject after each credit card transaction', () => {
    const subject = new PaymentSubject()
    const payment = new Payment(subject)

    const paymentSubjectNotifierSpy = jest.spyOn(
      payment.paymentSubject,
      payment.paymentSubject.notify.name,
    )

    const data = { userName: 'mlarrubia', id: Date.now() }
    payment.creditCard(data)

    expect(paymentSubjectNotifierSpy).toBeCalledWith(data)
  })

  test('#All should notify subscribers after each credit card payment', () => {
    const subject = new PaymentSubject()
    const shipping = new Shipping()
    const marketing = new Marketing()

    const shippingSpy = jest.spyOn(shipping, shipping.update.name)
    const marketingSpy = jest.spyOn(marketing, marketing.update.name)

    subject.subscribe(shipping)
    subject.subscribe(marketing)

    const payment = new Payment(subject)
    const data = { userName: 'mlarrubia', id: Date.now() }
    payment.creditCard(data)

    expect(shippingSpy).toBeCalledWith(data)
    expect(marketingSpy).toBeCalledWith(data)
  })
})