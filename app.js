const express = require('express');
// Express - веб-фреймворк для написания веб-серверов на Node.js, имеет в своем распоряжении множество служебных методов HTTP и промежуточных обработчиков, чтобы создать надежный API или веб-сайт.

const logger = require('morgan'); // легирует информацию
const cors = require('cors'); // с какого сервера можно подключаться 

const contactsRouter = require('./routes/api/contacts')

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); // позволяет серверу читать файлы в json - формате

app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
})

module.exports = app;
