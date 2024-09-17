const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const moment = require("moment");
const fs = require("fs/promises");

const contactsRouter = require('./routes/api/contacts');

const app = express();

app.set("json spaces", 8); //додає 8 пробілів в браузері

//запускаємо прогу moment та відстежуємо всі запити в файлі server.log 
app.use(async (req, res, next) => {
  const { method, url } = req;
  const date = moment().format("DD-MM-YYYY_hh:mm:ss");
  await fs.appendFile("server.log", `\n${method} ${url} ${date}`);
  next();
});

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message, })
});

module.exports = app;
