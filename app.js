import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import contactsRouter from './src/routes/api/contacts.js';
import authRouter from './src/routes/api/auth.js';
import { handleDuplicateKeyError } from './src/helpers/handleDuplicateKeyError.js';

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);
app.use('/api/users', authRouter);

app.use((_, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Use api on route',
    data: 'Not found',
  });
});

app.use((err, req, res, next) => {
  if (err.code && err.code === 11000) {
    handleDuplicateKeyError(err, res);
    return;
  }

  res.status(500).json({
    status: 'fail',
    code: 500,
    message: err.message,
    data: 'Internal Server Error',
  });
});

export default app;
