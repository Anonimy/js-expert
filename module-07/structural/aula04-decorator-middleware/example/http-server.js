import http from 'http'
import { InjectHttpInterceptor } from '../index.js'

InjectHttpInterceptor()

function handleRequest(_request, response) {
  response.end('hello, world!')
}

const server = http.createServer(handleRequest)
const PORT = 3000

server.listen(PORT, () => console.log('server running at', server.address().port))
