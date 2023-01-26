//VZff6lX7uWE24YmJ
const express = require('express')
const logger = require('morgan');
const cors = require('cors');

const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter)

app.use(( request, response ) =>{
  response.status(404).json({message: 'Not found'})
});

app.use((error, request, response, next) =>{
  const {status = 500, message = 'Server error'} = error
  response.status(status).json({message})
});

module.exports = app;


