const app = require('./app')
const mongoose = require('mongoose');

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

mongoose.connect(uriDb)
  .then(() => {
    app.listen(PORT, () => {
      console.log('Database connection successful');
    });
  })
  .catch(err => {
    console.log(`Server not running. Error message: ${err.message}`);
      process.exit(1);
    }
  );