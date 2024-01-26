import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import contactsRouter from './routes/api/contacts';
import usersRouter from './routes/users';
import mongoose from 'mongoose';
import expressJwt from 'express-jwt';
import authenticateToken from './middleware/authenticateToken';

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public/avatars'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use('/avatars', express.static(path.join(__dirname, 'public/avatars')));
app.use('/api/users', authenticateToken, usersRouter);
app.use('/api/contacts', authenticateToken, contactsRouter);

app.use((req, res) => {
  return res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  return res.status(500).json({ message: err.message });
});

export default app;