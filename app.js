const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const contactsRouter = require('./routes/contacts.routes')
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', contactsRouter)

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
const uriDB = process.env.DATABASE_URL
const connection = mongoose.connect(uriDB, {
  dbName: 'db-contacts',
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.then(() => {
  console.log('Database connection successful');
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`)
  });
})
.catch((err) => {
  console.error(`Error while establishing connection: [${err}]`)
  process.exit(1)
});
