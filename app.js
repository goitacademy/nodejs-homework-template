import express from 'express';
const app = express();
import logger from "morgan";
import cors from 'cors';
import helmet from 'helmet';
import contactsRouter from './routes/API/contacts/index.js';
import authRouter from './routes/API/users/index.js';
import usersRouter from './routes/API/agregation/agregUsers.js';
import { httpCode } from './lib/constants.js';

const formatsLogger = app.get('env') ===  'development' ? 'dev' : 'short';

app.use(helmet())
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); //from JSON

app.use('/api/contacts', contactsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

app.use((req, res) =>{
    res.status(httpCode.NOT_FOUND)
    .json({
        status: 'error',
        code: httpCode.NOT_FOUND,
        message: 'bed request not found'})
});

app.use((err, req, res, next) =>{
    res.status(httpCode.INTERNAL_SERVER_ERROR)
    .json({
        status: 'fail',
        code: httpCode.INTERNAL_SERVER_ERROR,
        message: err.message
    })
});

export default app;

// npx nodemon bin/server.js