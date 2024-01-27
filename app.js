import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { router } from './routes/api/contacts.js';
dotenv.config();
const app = express();

const uriDb = process.env.URI_DB;

const connectDB = async () => {
  try {
    await mongoose.connect(uriDb);
    console.log('DB connection successful.');
    app.listen(3000, () => {
      console.log('Server running. Use our API on port: 3000');
    });
  } catch (err) {
    console.log(`DB connection error:${err}`);
    process.exit(1);
  }
};

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/contacts', router);

app.use((req, res) => {
  res.status(404).json({ message: 'Contact with the given ID was not found' });
});

app.use((err, req, res, next) => {
  const ValidationErrorReason = Object.keys(err?.errors)[0];
  err.name === 'ValidationError'
    ? res.status(400).json({ message: `Missing required ${ValidationErrorReason} - field` })
    : res.status(500).json({ message: err.message });
});

connectDB();

export { app };