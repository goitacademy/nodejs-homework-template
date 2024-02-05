
import express from 'express'
import logger from "morgan";
import cors from "cors";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import contactsRouter from "./routes/api/contacts/contacts.js";
import usersRouter from './routes/api/users/users.js';
import multer from 'multer';
import path from 'path';

const app = express()

dotenv.config();


const avatarUploadDir = path.join(process.cwd(), 'public', 'avatars');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, avatarUploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadAvatar = multer({ storage });

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
app.use('/', contactsRouter);
app.post('/avatars', uploadAvatar.single('avatar'), (req, res) => {
  return res.status(200).json({ message: 'Аватар успешно загружен' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

export default app;
