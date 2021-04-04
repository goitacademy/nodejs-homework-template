const express = require('express')
const {HttpCode} = require('./helpers/constans')

const logger = require('morgan')
const cors = require('cors')
const helmet = require("helmet");

const contactsRouter = require('./routes/api/contacts')
const authRouter = require('./routes/api/auth')
const usersRouter = require('./routes/api/users')
const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(helmet());
app.use(express.json({limit:10000}))

app.use('/api/contacts', contactsRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)

app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: `Use api on routes: 
    /api/auth/registration - registration user {username, email, password}
    /api/login - login {email, password}
    /api/list - get message if user is authenticated`,
    data: 'Not found',
  })
})

app.use((req, res) => {
  //res.status(404).json({ message: 'Not found' })
   res.status(HttpCode.NOT_FOUND).json({ 
    status: 'error',
    code: HttpCode.NOT_FOUND,
    message: `Use api on routes ${req.baseUrl}/api/contacts`, 
    data: 'Not found' 
  })
})

app.use((err, req, res, next) => {
  //res.status(500).json({ message: err.message })
err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR;
  res.status(err.status).json({
    status: err.status === HttpCode.INTERNAL_SERVER_ERROR ? 'fail' : 'error',
    code: err.status,
    message: err.message,
    data: err.status === HttpCode.INTERNAL_SERVER_ERROR ? 'Internal Server Error' : err.data
  })
})




module.exports = app

