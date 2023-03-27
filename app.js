const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose');
const contactsRouter = require('./routes/api/contacts')
const authRouter = require('./routes/api/auth');
const app = express()



const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'


mongoose.connect('mongodb+srv://nirqqen97:lmao123@cluster0.6fhtlzz.mongodb.net/test').then((con) =>{
  console.log("Database connection successful")
  
}).catch((err) => {
  console.log(err + 'error');

  process.exit(1)
  
})
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use('/users', authRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.all("*",(req,res) =>{
  res.status(404).json({
    msg: "Nothing founded"
  })
})

app.use((err, req, res, next) => {
 
  
  res.status(err.status || 500).json({ message: err.message })
})



module.exports = app
