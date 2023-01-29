// qZRhej5142LnSy3i   // password MongoDb
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const { routerContacts } = require('./routes/api/contacts');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// middelvwares
app.use(logger(formatsLogger));
app.use(express.json()); // tell express to work with JSON
app.use(cors()); // разрешаем кроссдоменные запросы к нашему приложению через промежуточное ПО cors

// routes
app.use("/api/contacts", routerContacts);

// 404
app.use((_, res, __) => {
  res.status(404).json({message: 'Use api on routes: /api/contacts'});
});

// error handling
app.use((error, _, res, __) => {
  return res
    .status(error.status || 500)
    .json({ message: error.message || "Internal server error" });
});

module.exports = app;