const express = require('express');
const cors = require('cors');
const logger = require('morgan')
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

app.use(express.json());

app.use(cors());

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))

const routerApi = require('./api');
app.use('/api', routerApi);

app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Use api on routes: /api/contacts',
    data: 'Not found',
  });
});

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: 'fail',
    code: 500,
    message: err.message,
    data: 'Internal Server Error',
  });
});

const { DB_HOST } = process.env;

const PORT = process.env.PORT || 3000;

const connection = mongoose.connect(DB_HOST);

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Database connection successful`);
    });
  })
  .catch(err =>
    {console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1)}
  );

