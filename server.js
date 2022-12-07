const app = require('./app');
const mongoose = require('mongoose')

require('dotenv').config()

const {DB_HOST, PORT = 3000} = process.env;

mongoose.connect(DB_HOST)
  .then(() =>{
      app.listen(PORT, (err) => {
        if (err) console.error('Error at a server launch:', err);
        console.log(`Server running. Use our API on port: ${PORT}`);
      })
      console.log("Database connection successfuly")})
  .catch((error) => {
    console.log(error.message);
    process.exit(1)
  });



