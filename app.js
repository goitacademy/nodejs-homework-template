const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users'); // Import routera użytkowników

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// 👉 Podpięcie API dla kontaktów i użytkowników
app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter); // Dodajemy obsługę użytkowników

// 👉 Udostępnienie folderu public dla statycznych plików (np. awatary)
app.use('/public', express.static('public'));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;

