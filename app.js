const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Use api on routes: /api/tasks',
    data: 'Not Found',
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    status: 'fail',
    code: 500,
    message: err.message,
    data: 'Internal Server Error',
  });
});
const PORT = process.env.PORT || 3000;

// app.listen(PORT, function () {
//   console.log(`Server running. Use our API on port: ${PORT}`);
// });

module.exports = app;
