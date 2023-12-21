import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import logger from 'morgan'
import { contactsRouter } from './routes/api/contacts'

export const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use(() => {
  createHttpError(400, 'Not found')
})

app.use((err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  res.status(500).json({ message: err.message })
})
