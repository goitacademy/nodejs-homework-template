const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const contactsRouter = require('./routes/api/contacts');
const userRoutes = require('./routes/users');

const app = express(); 
  
app.use('/avatars', express.static(path.join(__dirname, 'public/avatars')));

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);
app.use('/api/auth', userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
