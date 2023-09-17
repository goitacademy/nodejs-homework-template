// const express = require('express');
// const logger = require('morgan');
// const cors = require('cors');

// const contactsRouter = require('./routes/api/contacts');
// console.log('contactsRouter: ', contactsRouter);

import express from 'express';
import logger from 'morgan';
import cors from 'cors';

import contactsRouter from './routes/api/contacts-router.js';

const app = express();

// -------------------------------
// const corsMiddleware = cors();
// app.use(corsMiddleware);

// const contacts = require('./models/contacts.json');
// console.log('contacts: ', contacts);

// app.use((req, res, next) => {
//   console.log('First middleware');
//   next();
// });

// app.use((req, res, next) => {
//   console.log('Second middleware');
//   next();
// });

// app.get('/', (req, res) => {
//   // res.json([]);
//   res.send('<h1>Home page</h1>');
// });

// app.get('/products', (req, res) => {
//   res.json([]);
// });

// app.get('/contacts', (req, res) => {
//   // const databaseResponse = null;
//   // res.send(databaseResponse);
//   // res.json(databaseResponse);
//   // console.log('req.url: ', req.url);
//   // console.log('req.method: ', req.method);
//   // res.send('<h1>Contacts page</h1>');
//   // res.send(contacts);
//   res.json(contacts);
// });
// -------------------------------

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());

// -------------------------------
// app.get('/api/contacts', (req, res) => {
//   res.json(contacts);
// });

// app.get('/api/contacts/:id', (req, res) => {
//   res.json(contacts[0]);
// });

// app.post('/api/contacts', (req, res) => {
//   res.json(contacts[0]);
// });

// app.delete('/api/contacts/:id', (req, res) => {
//   res.json(contacts[0]);
// });

// app.put('/api/contacts/:id', (req, res) => {
//   res.json(contacts[0]);
// });
// -------------------------------

app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

// module.exports = app;
export default app;
