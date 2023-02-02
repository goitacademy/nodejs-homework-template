import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import contactsRouter from './src/routes/api/contacts.js';
import authRouter from './src/routes/api/auth.js';

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// app.get('/', (req, res) => {
//   res.send('API is running');
// });

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);
app.use('/api/users', authRouter);
app.use(express.static('public')); // to serve static files

app.use((_, res) => {
  res.status(404).json('Use api on route not found');
});

app.use((err, req, res, next) => {
  if (err.status) {
    const { status, message } = err;
    return res.status(status).json(message);
  }

  if (err.name === 'ValidationError') {
    const { message } = err;
    return res.status(400).json(message);
  }

  if (err.message.includes('ObjectId failed')) {
    return res.status(400).json('Id type is invalid');
  }

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json(err.message);
  }

  res.status(500).json('Internal Server Error');
});

export default app;
