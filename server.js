const path = require('path');
const mongoose = require('mongoose');
const app = require(path.join(__dirname, 'app'));

// const { DB_HOST, PORT } = process.env;
const { DB_HOST, PORT } = require("./config.js");

// mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
.then(()=> {
  console.log("Database connection successful")
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
})
.catch(error =>{
  console.log(error.message);
  process.exit(1);
})


