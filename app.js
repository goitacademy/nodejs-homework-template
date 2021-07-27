const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const api = require('./routes/api');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
require('./configs/passport-config');

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', api.contacts);
app.use('/api/users', api.auth);

app.use((_, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not found',
  });
});

app.use((error, _, res, __) => {
  const { code = 500, message = 'Server error' } = error;

  res.status(code).json({
    status: 'fail',
    code,
    message,
  });
});

module.exports = app;
// const express = require('express');
// const logger = require('morgan');
// const cors = require('cors');
// require('dotenv').config();
// const mongoose = require('mongoose');

// const { DB_HOST, PORT = 3000 } = process.env;

// const app = express();
// const api = require('./routes/api/contacts.js');
// const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
// require('./configs/passport-config');

// app.use(logger(formatsLogger));
// app.use(cors());
// app.use(express.json());

// app.use('/api/v1/contacts', api.contacts);

// app.use((_, res) => {
//   res.status(404).json({ message: 'Not found' });
// });

// app.use((err, _, res, __) => {
//   res.status(500).json({ message: err.message });
// });

// mongoose
//   .connect(DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Database running');
//     app.listen(PORT);
//   })
//   .catch(error => console.log(error));

// module.exports = app;
