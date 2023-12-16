import express from 'express';
import cors from 'cors';
import './config/passport.config.js';
import usersRouter from './routes/users.routes.js';
const contactsRouter = require('./routes/api/contacts.route.js');
import { AVATARS_DIR } from './helpers/globalVariables.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use('/api/avatars', express.static(AVATARS_DIR));

app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: `The given endpoint does not exist`,
    data: 'Not found',
  });
});

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: 'fail',
    code: 500,
    message: err.message,
    data: 'Internal Server Error',
  });
});

export default app;
