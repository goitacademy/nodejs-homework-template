const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

const app = require('./app');
require("dotenv").config();

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(app.listen(3000, console.log('Database connection successful'))

  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });









// const PORT = 5003
// app.listen(PORT, ()=>{
//   console.log("Server running. Good job!!! Use our API on port: 5000")
// })
