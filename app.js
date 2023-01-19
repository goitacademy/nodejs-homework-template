const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const fs = require('fs/promises');
const path = require('path');

const app = express();

require('dotenv').config();

const authRouter = require('./routes/api/users');
const contactsRouter = require('./routes/api/contacts');

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const tempDir = path.join(__dirname, 'temp');
console.log(tempDir);
const productsDir = path.join(__dirname, 'public', 'avatars');

const multer = require('multer');

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 10000,
  },
});

const avatars = [];
const upload = multer({
  storage: multerConfig,
});
app.post('/api/contacts', upload.single('image'), async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const resultUpload = path.join(productsDir, originalname);
  try {
    await fs.rename(tempUpload, resultUpload);
  } catch (error) {
    await fs.unlink(tempUpload);
  }
});

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/users', authRouter);
// app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
