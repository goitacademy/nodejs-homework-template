const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.listen(3001)
// app.listen(3000, ()=> console.log('server run'))
// console.log("server run");

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
//  console.log("hello");
//  res.send(<h2>hello</h2>)
  res.status(404).json({ message: 'Not found' })
  // res.send("hello")
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})


// app.get("/", (request,response) =>{
// // response.send(<h2>Home</h2>)
// })

// app.get("/contacts", (request,response) =>{
//   // response.send(<h2>Contacts</h2>)
// })




module.exports = app
