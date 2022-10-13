const app = require('./app')
const mongoose = require('mongoose');
require('dotenv').config();
const {DB_HOST, PORT} = process.env;

mongoose.connect(DB_HOST).then(() => {
  console.log("Database connection successful"); 

  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch((error) => { 
  console.log(error.message)
  process.exit(1)
})


