const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const authRouter = require('./routes/api/auth');
const contactsRouter = require('./routes/api/contacts');
// показывает в терминале: метод, путь, статус
app.use(logger(formatsLogger))
// разрешает кросдаменные запросы
app.use(cors())
// указывает, что тело запроса нужно перевести в json
app.use(express.json())

app.use('/api/users', authRouter);
app.use('/api/contacts', contactsRouter);

// мидлвара которая обрабатывает пути, которых нет в роутах
app.use((req, res) => {
  res.status(404).json({
    message: 'Not found'
  })
})
// мидлвара, которая обрабатывает все ошибки (всплывают из функций-контролеров)
app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message })
})

module.exports = app
