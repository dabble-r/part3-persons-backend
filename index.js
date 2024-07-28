const http = require('http')

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello World')
})

//console.log('hello world')

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)