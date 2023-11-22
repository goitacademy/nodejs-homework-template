import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import router from './routes/api/contacts-router.js';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', router);

app.use((req, res) => {
  console.log(req.body);
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({
    message,
  });
});

export default app;
