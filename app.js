const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const contactsRouter = require('./routes/api/contacts');  // Ruta corregida al módulo

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connection successful');
    app.listen(port, () => {
      console.log(`Server running. Use our API on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log('There was an error', error);
    process.exit(1);
  });

app.use('./api/contacts', contactsRouter);  // Ruta corregida al módulo

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
