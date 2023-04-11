const express = require('express');
// express для маршрутизації
const cors = require('cors');
// cors для обміну між доменами
// const logger = require('morgan');

const contactsRouter = require('./routes/api/contacts');

const app = express();
// app як записна книга, а листок до неї робимо в routes/api/contacts

// const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

// app.use(logger(formatsLogger))
// app.use(express.json());
app.use(cors());

app.use('/api/contacts', contactsRouter); 


app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})


module.exports = app
