const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

const { DB_URI, PORT = '3008'} = process.env;

mongoose
  .connect(DB_URI)
  .then(() => {
      console.log("Database connection successful");
      app.listen(PORT, () => console.log(`Server running. Use our API on port: ${ PORT }`));
  })
  .catch((err) => {
      console.log(err.message);
      process.exit(1);
  });
