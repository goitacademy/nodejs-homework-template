// const app = require('./app')
const mongoose = require('mongoose');
const logger = require('morgan');
mongoose.set('strictQuery', true);

const express = require('express');
const cors = require('cors');

require('dotenv').config();


const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))

app.use(cors())
app.use(express.json())

const routerApi = require('./routes/api/contacts');
app.use('/api/contacts', routerApi);

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

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;
const connection =  mongoose.connect(uriDb,
   {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// console.log(connection)
connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(err =>
    console.log(`Server not running. Error message: ${err.message}`),
  );

// const { DB_HOST, PORT = 3000 } = process.env;

// mongoose.connect(DB_HOST)
//   .then(() => app.listen(PORT, () => {
//     console.log("Database connect success")
//   }))
//   .catch(error => {
//     console.error(error.massage);
//     process.exit(1)
//   })

