import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import { HttpCode } from './lib/constants'
import { NotFound } from './lib/messages'

import contactsRouter from './routes/api/contacts'

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json()) // json
app.use(express.urlencoded({ extended: false })) // forms

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  return res.status(HttpCode.Not_Found).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    message: NotFound,
  })
})
app.use((err, req, res, next) => {
  res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
    status: 'fail',
    code: HttpCode.INTERNAL_SERVER_ERROR,
    message: err.message,
  })
})

export default app
