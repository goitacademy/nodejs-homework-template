const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const contactsRouter = require('./routes/api/contacts');
const userRouter = require('./routes/api/user');
const viewRouter = require('./routes/api/viev');
const dotenv = require('dotenv');
const path = require('path');



const app = express()



const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? './envs/production.env' : './envs/developer.env',
});

const { serverConfig } = require('./config');
// const { globalError } = require('./controllers');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


mongoose
  .connect(serverConfig.mongoUrl, { dbName: serverConfig.dbname })
  .then((can) => {
    console.log('mongo.db is connected');
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/users', userRouter);
app.use('/api/contacts', contactsRouter);
app.use('/', viewRouter);

app.use((err, req, res, next) => {
  res.status(err.status ?? 500).json({ message: err.message });
})

app.all('*', (req, res) => {
  res.status(404).json({ message: 'Not found' })
})

module.exports = app
