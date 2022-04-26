const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const contactsRouter = require('./routes/api/contacts');
const CORS = process.env.CORS ?? '*';
console.log(CORS);

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(express.json());
app.use(cors({ origin: CORS }));
app.use(morgan(formatsLogger));

app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Page Not found' });
});

app.use((err, req, res, next) => {
  const statusCode = err.status ?? 500;
  res.status(statusCode).send(err.message);
});

module.exports = app;
