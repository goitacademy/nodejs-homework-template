const express = require('express');
const cors = require('cors');
const logger = require('morgan')
const mongoose = require('mongoose');
const routerApi = require("./routes/api/contacts");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
)
app.use(express.json());
app.use('/', routerApi);

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

mongoose.Promise = global.Promise
const connection =  mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(err =>{
    console.log(`Server not running. Error message: ${err.message}`)
    process.exit(1)
  })
 
