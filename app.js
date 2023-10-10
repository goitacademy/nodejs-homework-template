const express = require('express')
const logger = require('morgan')
const cors = require('cors')

// //  hw3------
// const mongoose = require('mongoose');
// const DB_HOST = "mongodb+srv://Kseniya:Mo25101981@cluster0.jihsow2.mongodb.net/db-contacts?retryWrites=true&w=majority";

// // mongoose.set("strictQuery", trye);

// mongoose.connect(DB_HOST)
// .then(() => console.log("Database connection successful"))
// .catch(error => console.log(error.message));


// // --------hw3

const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
