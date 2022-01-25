import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import { HttpCode} from './lib/constants'

import contactsRouter from './routes/api/contacts'
import authRouter from './routes/api/auth'
import usersRouter from './routes/api/users'

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(helmet())
app.use(logger(formatsLogger))
app.use(express.static(process.env.FOLDER_FOR_AVATARS))
app.use(cors())
app.use(express.json()) 
app.use((req, res, next) => {
  app.set('lang', req.acceptsLanguages(['en', 'ru']))
  next()
})

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
    status: 'fail',
    code: HttpCode.INTERNAL_SERVER_ERROR,
    message: err.message,
  })
})

export default app
