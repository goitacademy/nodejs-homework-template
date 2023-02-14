import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import contactsRouter from './routes/api/contacts';
import { errorMiddleware } from './middlewares/errors.middleware';
import { responseClientError } from 'helpers/apiHelpers';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use((_, res) => {
  res.status(404).json(responseClientError(new Error('Not found'), 404));
});

app.use(errorMiddleware);

export default app;
