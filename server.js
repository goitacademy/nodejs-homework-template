const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

const app = require('./app');
require("dotenv").config();

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(app.listen(3003, console.log('Database connection successful'))

  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
