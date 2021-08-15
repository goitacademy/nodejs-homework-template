const mongoose = require('mongoose');
const app = require('../app');
require('dotenv').config();

const { PORT = 3000, DB_HOST } = process.env;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`Server running. Use our API on port: ${PORT}`);
    app.listen(PORT);
  })
  .catch(error => {
    console.log(`Connection error: ${error}`);
    process.exit(1);
  });