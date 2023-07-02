 const mongoose = require('mongoose');

const app = require('./app');

// const DB_HOST = require("./config");

const {DB_HOST, PORT=3000} = process.env


 mongoose.set('strictQuery',true);


 mongoose.connect(DB_HOST)
.then(() => {

    console.log("Database connection successful");
    app.listen(PORT)
})
.catch(err => {
  console.log(`Server not running. Error message: ${err.message}`);
  process.exit(1);
});

// , () => {
//   console.log("Server running. Use our API on port: 3000")
// })
