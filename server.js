const app = require('./app')
const mongoose = require('mongoose');
require('dotenv').config()

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST;

const connection = mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

connection
  .then(() => {
    console.log("Database connection successful!")
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  })