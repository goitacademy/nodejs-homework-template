import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import * as path from 'path';
import * as url from 'url';
import contactsRouter from './routers/contacts.js';
import userRouter from './routers/user.js';
import meRouter from './routers/me.js';

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

app.use(logger(formatsLogger));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use('/api/avatars', express.static(path.join(__dirname, 'public/avatars')));

app.use('/api/contacts', contactsRouter);
app.use('/api/user', userRouter);
app.use('/api/me', meRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'server error' } = err;
  res.status(status).json({ message });
});

export default app;
