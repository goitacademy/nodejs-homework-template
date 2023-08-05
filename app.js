import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import { router as contactsRouter } from './routes/api/contacts.js';

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use('/api/contacts', contactsRouter);

// неизвестный маршрут
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// общий обработчик ошибок
app.use((err, req, res, next) => {
  const { status, message } = err;
  res.status(status).json({ message });
});

export default app;
