const http = require('http')
const express = require('express')
app = express();
app.use(express.json())

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

//check for id duplicates, create new person
const checkId = (num) => {
  return persons.filter(ele => ele.id == num)
}

//check name, create new person
const checkName = (str) => {
  return persons.filter(ele => ele.name == str)
}

//recursive solution to find unique id
const uniqId = (num) => {
  // Base Case
  if (!checkId(num)) {
    return id;
  }
  //Recursion
  return idGenerator();
}

// generate maxID for post new person
const idGenerator = () => {
  const rand = Math.floor(Math.random() * 1000);
  return String(rand);
}

//get the root route
app.get('/', (request, response) => {
  response.send(`<h1>Hello World!</h1>`)
})

//get the persons array of objs route
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

//get an individual person route
//display 404 status if no such person is found
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const person = persons.find(person => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
})

//delete an individual person
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  //const person = persons.find(person => person.id == id) ? person : null;
  const deleted = persons.filter(person => person.id !== id);
  //console.log(id)
  response.json(deleted)
 
 
})

//add persons to the server, permanent changes
app.post('/api/persons', (request, response) => {
  const body = request.body;
  const rand = idGenerator();

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number is missing' 
    })
  }
  if (checkName(body.name)) {
    return response.status(400).json({
      error: "name must be unique"
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: uniqId(rand)
  }

  persons = persons.concat(person)
  //console.log(request.body)
  response.json(person)
})

app.get('/api/info', (request, response) => {
  const timestamp = new Date();
  const detail = persons.length;
  const info = `<div>
          <p> Phonebook has info for ${detail}.</p>
          <p> ${timestamp} </p>
      </div>`
   response.send(info)
})



const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)