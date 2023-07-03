 const mongoose = require('mongoose');

const app = require('./app');


// const DB_HOST = require("./config");

const {DB_HOST, PORT=3000} = process.env

// const DB_HOST="mongodb+srv://Andy:notAllowedAccess@cluster0.5mjlhcp.mongodb.net/db-contacts?retryWrites=true&w=majority"


//  mongoose.set('strictQuery',true);


 mongoose.connect(DB_HOST)
.then(() => {
  app.listen(PORT)
    console.log("Database connection successful");

    
})
.catch(err => {
  console.log(`Server not running. Error message: ${err.message}`);
  process.exit(1);
});

// , () => {
//   console.log("Server running. Use our API on port: 3000")
// })
