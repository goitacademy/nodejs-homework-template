import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import contactsRouter from './routes/api/contactsRouter.js';
import authRouter from './routes/api/authRouter.js';

// #########################################################

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); //  parses incoming requests with JSON payloads

app.use('/api/auth', authRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Express error handler
app.use(({ status = 500, message = 'Server error' }, req, res, next) =>
  res.status(status).json({ message })
);

export default app;
