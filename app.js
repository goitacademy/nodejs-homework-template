import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import contactsRouter from './src/routes/api/contacts.js';
import authRouter from './src/routes/api/auth.js';
import { handleDuplicateKeyError } from './src/helpers/handleDuplicateKeyError.js';
import { setErrorResponse } from './src/helpers/setResponse.js';

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);
app.use('/api/users', authRouter);

app.use((_, res) => {
  res.status(404).json(setErrorResponse(404, 'Use api on route not found'));
});

app.use((err, req, res, next) => {
  if (err.message.includes('ObjectId failed')) {
    return res.status(400).json(setErrorResponse(400, 'Id type is invalid'));
  }

  if (err?.code === 11000) {
    handleDuplicateKeyError(err, res);
    return;
  }

  res.status(500).json(setErrorResponse(500, err.message));
});

export default app;
