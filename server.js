const mongoose = require("mongoose");

const DB_HOST = "mongodb+srv://antontsyrkunov:36LZaWDuhlriOuhj@workingcluster.h5ib1ni.mongodb.net/contscts_reader?retryWrites=true&w=majority"

mongoose.set('strictQuery', true)

const app = require('./app')

const {PORT = 3000} = process.env;

mongoose.connect(DB_HOST)
.then(() => {
  app.listen(PORT)
  console.log("Server connected");
})
.catch(error =>  {
  console.log(error.message);
  process.exit(1);
})


