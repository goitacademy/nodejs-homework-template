import express from 'express';
const app = express();
import logger from "morgan";
import cors from 'cors';

import contactsRouter from './routes/API/contacts/index.js';
import authRouter from './routes/API/users/index.js';
import usersRouter from './routes/API/agregation/agregUsers.js';

const formatsLogger = app.get('env') ===  'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); //from JSON

app.use('/api/contacts', contactsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

app.use((req, res) =>{
    res.status(404).json({message: 'bed request no found'})
});

app.use((err, _req, res, _next) =>{
    res.status(500).json({message: err.message})
});

export default app;

// npx nodemon bin/server.js