const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

const contactsRoutes = require('./routes/api/contacts');
app.use('/api/contacts', contactsRoutes);

module.exports = app;
