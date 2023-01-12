const express = require('express');
const cors = require('cors');
const contactsRouter = require('./routes/api/contacts');

const mongoose = require('mongoose')
mongoose.set('strictQuery', false);

require('dotenv').config()

const {HOST_URI} = process.env

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/contacts', contactsRouter);




app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not found',
  });
});

app.use((err, _, res, __) => {
  console.log('API Error:', err.message);
  res.status(500).json({
    status: 'fail',
    code: 500,
    message: err.message,
    data: 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

async function main() {
  try {
  await mongoose.connect(HOST_URI);
  console.log('Database connection successful');
  } catch (error) {
    console.error('Error while connecting to mongodb', error.massage);
    process.exit(1);
  }
}

main()
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(err =>
    console.log(`Server not running. Error message: ${err.message}`),
  );
