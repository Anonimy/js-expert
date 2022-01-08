export default class PaymentSubject {
  #oberservers = new Set()
  notify(data) {
    this.#oberservers.forEach(observer => observer.update(data))
  }

  subscribe(observable) {
    this.#oberservers.add(observable)
  }

  unsubscribe(observable) {
    this.#oberservers.delete(observable)
  }
}
