const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const usersRouter = require('./users/users.router');
const router = require('./contacts/contact.router');

const app = express()

app.use(cors())
app.use(express.json())
app.use('/users', usersRouter)
app.use('/api', router)

app.use(express.static('public'));

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, _, res, __) => {
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 3000
const uriDb = process.env.DB_HOST

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
.then(() => {
  app.listen(PORT, function() {
    console.log("Database connection successful")
  })
})
.catch((err) =>
console.log(`Server not running. Error message: ${err.message}`)
);

module.exports = connection;