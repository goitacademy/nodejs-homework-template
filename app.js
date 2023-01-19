import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import contactsRouter from './src/routes/api/contacts.js';
import authRouter from './src/routes/api/auth.js';

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);
app.use('/api/users', authRouter);

app.use((_, res) => {
  res.status(404).json('Use api on route not found');
});

app.use((err, req, res, next) => {
  if (err.status) {
    const { status, message } = err;
    return res.status(status).json(message);
  }

  if (err.message.includes('ObjectId failed')) {
    return res.status(400).json('Id type is invalid');
  }

  res.status(500).json('Internal Server Error');
});

export default app;
