
import express from 'express'
import logger from "morgan";
import cors from "cors";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import usersRouter from './routes/api/users.js';
import contactsRouter from "./routes/api/contacts.js";

const app = express()

dotenv.config();

const { MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Connection error:', err);
  process.exit(1);
});

db.once('open', () => {
  console.log('Database connection successful');
});

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/users', usersRouter);
app.use('/', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

export default app;
