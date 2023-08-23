import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { contactsRouter } from './routes/api/contacts.js';
import { usersRouter } from './routes/api/users.js';
import passport from './config/config-passport.js';

export const app = express();
const logger = morgan;

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);
app.use(passport.initialize());
app.use(express.static('public'));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
