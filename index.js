const http = require('http')
const express = require('express')
app = express();


let persons = [
  {
    id: "1",
    name: "Nicholas Broussard",
    number: "504-919-3191"
  },
  {
    id: "2",
    name: "Albert Brooks",
    number: "504-919-3192"
  },
  {
    id: "3",
    name: "Louis CK",
    number: "504-919-3193"
  },
  {
    id: "4",
    name: "Frank Sinatra",
    number: "504-919-3194"
  }
]


app.get('/', (request, response) => {
  response.send(`<h1>Hello World!</h1>`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)