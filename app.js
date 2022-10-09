// nvNJjvy7HOcKbXJq

const mongoose = require("mongoose");

const DB_HOST = "mongodb+srv://Natallia:nvNJjvy7HOcKbXJq@cluster0.nhrm3gr.mongodb.net/contacts-phonebook?retryWrites=true&w=majority";


mongoose.connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch(console.error("error"))

// const express = require('express')
// const logger = require('morgan')
// const cors = require('cors')

// const contactsRouter = require('./routes/api/contacts')

// const app = express()

// const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

// app.use(logger(formatsLogger))
// app.use(cors())
// app.use(express.json())

// app.use('/api/contacts', contactsRouter)

// app.use((req, res) => {
//   res.status(404).json({ message: 'Not found' })
// })

// app.use((err, req, res, next) => {
//   const {status = 500, message = "Server error"} = err;
//   res.status(status).json({ message, })
// })

