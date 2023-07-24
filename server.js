const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require('./app');
// gWtwzXQqvOSnpsXx

dotenv.config();

const {DB_HOST, PORT} = process.env;

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log('Database connection successful')
    })
  })
  .catch(error => console.log(error.message))
