const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const contactsRouter = require('./routes/api/contacts');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 📦 Serwowanie statycznych plików z folderu public/avatars
app.use('/avatars', express.static(path.join(__dirname, 'public/avatars')));

// Routes
app.use('/api/contacts', contactsRouter);

// Obsługa błędu 404
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Obsługa błędów
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
