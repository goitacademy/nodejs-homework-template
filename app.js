import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import { HttpCode } from './lib/constants'

import contactsRouter from './routes/api/contacts'
import authRouter from './routes/api/auth'


const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(express.static(process.env.FOLDER_FOR_AVATARS))
app.use(cors())
app.use(express.json())

// app.use(express.static('public'))

app.use('/api/auth', authRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  return res
  .status(HttpCode.NOT_FOUND)
  .json({ status: 'error', code: HttpCode.NOT_FOUND, message: "Not found" })
})

app.use((err, req, res, next) => {
  res
  .status(HttpCode.INTERNAL_SERVER_ERROR)
  .json({ status: 'fail', code: HttpCode.INTERNAL_SERVER_ERROR, message: err.message
 })
})
export default app
