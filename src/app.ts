"use strict";

import express,
{
  Request,
  Response,
  NextFunction,
} from "express";

import logger from 'morgan';
import cors from 'cors';
import { serverLogger } from './helpers/server-logger';
import contactsRouter from './routes/api';

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(serverLogger);

app.use('/api/contacts', contactsRouter)

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = 'Server Error' } = err;
  res.status(status).json({ message })
})

export default app;
