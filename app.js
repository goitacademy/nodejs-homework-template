import express from 'express';
import logger from 'morgan';
import cors from 'cors';

import contactsRouter from './routes/api/contactsRouter.js';
import authRouter from './routes/api/authRouter.js';
import { filesRouter } from './routes/api/filesRouter.js';
import { errorHandler } from './helpers/apiHelpers.js';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));
app.use('/api/contacts', contactsRouter);
app.use('/api/users', authRouter);
app.use('/api/files', filesRouter);

app.use(errorHandler);
app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});

export default app;
