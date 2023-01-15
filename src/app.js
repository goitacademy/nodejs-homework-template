const express = require('express');
const logger = require('morgan');
const cors = require('cors');

//   import router from contacts.js
const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger));
app.use(cors());
// подключаем мидлвару которая будет парсить json/javascript
app.use(express.json());

//   say to use router from contacts.js
app.use('/api/contacts', contactsRouter);


app.use((res) => {
  res.status(200).json({ message:  'Success'  })
})


app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
