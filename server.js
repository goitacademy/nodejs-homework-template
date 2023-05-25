const mongoose = require("mongoose");

const {DB_HOST} = process.env;

mongoose.set('strictQuery', true);


mongoose.connect(DB_HOST, PORT=3000)
.then(() => {
  app.listen(PORT)
  console.log("Server connected");
})
.catch(error =>  {
  console.log(error.message);
  process.exit(1);
})

const app = require('./app')
