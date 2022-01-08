import Payment from './events/payment.js'
import Marketing from './observers/marketing.js'
import Shipping from './observers/shipping.js'
import PaymentSubject from './subjects/paymentSubject.js'

const subject = new PaymentSubject()

const marketing = new Marketing()
subject.subscribe(marketing)

const shipping = new Shipping()
subject.subscribe(shipping)

const payment = new Payment(subject)
payment.creditCard({ userName: 'mlarrubia', id: Date.now() })

subject.unsubscribe(marketing)

payment.creditCard({ userName: 'teste', id: Date.now() })
