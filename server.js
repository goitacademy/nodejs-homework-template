const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const uriDB = process.env.DB_HOST;

const connection = mongoose.connect(uriDB, {
  useNewUrlParser: true,
});

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log('Database connection successful');
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(err => {
    console.error(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
