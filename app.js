import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import contactsRouter from './routes/api/contactsRouter.js';
import mongoose from './db.js';
import usersRouter from './routes/api/usersRouter.js';
import path from 'path';
import multer from 'multer';
import jimp from 'jimp';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export default app;
