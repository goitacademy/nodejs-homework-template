import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import contactsRouter from 'routes/api/contacts.route';
import usersRouter from 'routes/api/users.route';
import { errorMiddleware } from './middlewares/errors.middleware';
import { responseError } from 'helpers/apiHelpers';
import { RouteNotFoundError } from 'helpers/errors';
import { authMiddleware } from './middlewares/auth.middleware';
import path from 'path';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/avatars', express.static(path.join(process.cwd(), 'public/avatars')));
app.use('/api/contacts', authMiddleware, contactsRouter);
app.use('/api/users', usersRouter);

app.use((_, res) => {
  res.status(404).json(responseError(new RouteNotFoundError()));
});

app.use(errorMiddleware);

export default app;
