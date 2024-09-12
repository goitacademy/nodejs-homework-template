import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';

import connectDB from './db.js';
import contactsRouter from './routes/api/contacts.js';
import usersRouter from './routes/api/users.js';

config();

const app = express();
await connectDB(process.env.DB_USER, process.env.DB_PASSWORD); // there is no need to capture any exceptions here because, if there are any, process will exit
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);

app.use((req, res) => {
	res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
	res.status(500).json({ message: err.message });
});

export default app;
