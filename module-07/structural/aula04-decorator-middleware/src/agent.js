import Http from 'http'

async function InjectHttpInterceptor() {
  const oldEmit = Http.Server.prototype.emit
  Http.Server.prototype.emit = function (...args) {
    const [type, req, res] = args

    if (type === 'request') {
      res.setHeader('x-instrumented-by', 'Mateus Larrubia')
    }

    return oldEmit.apply(this, args)
  }
}

export { InjectHttpInterceptor }
