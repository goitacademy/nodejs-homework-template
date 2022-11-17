const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const {Types} = require('mongoose')
<<<<<<< Updated upstream

const {contactsRouter} = require('./routes/api/contacts')
const { routerUser } = require('./routes/api/user')
// const { authRouter } = require('./routes/api/authRoutes')
=======
 const contactsRouter = require('./routes/api/contacts')
// const userRouter = require('./routes/api/user')

>>>>>>> Stashed changes

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use('/api/contacts', contactsRouter)
<<<<<<< Updated upstream
app.use('/api/users', routerUser)

app.use((req, res) => {
  console.log('404')
  res.status(404).json({ message: 'Not found' })
=======
// app.use('/api/users', userRouter)

app.use((req, res) => {
  // console.log('req', req)
  return res.status(404).json({ message: 'Not found' })
>>>>>>> Stashed changes
})

app.use((err, req, res, next) => {
  console.log('req', req)
  if (!Types.ObjectId.isValid(req.params.id)) res.status(404).json({message: "Not found"})
  return res.status(500).json({ message: err.message })
})

module.exports = { app }
