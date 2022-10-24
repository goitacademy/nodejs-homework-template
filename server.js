const app = require('./app')
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();


const { PORT, DB_HOST } = process.env;

mongoose.connect(DB_HOST)
  .then(() => app.listen(PORT, () => {
      console.log('Database connection successful')
    }),
  )
  .catch(error => {
    console.log(error)
    process.exit(1)
  })
  