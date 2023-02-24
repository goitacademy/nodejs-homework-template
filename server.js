const app = require('./app')
const {DB_HOST} = require("./config")
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect(DB_HOST)
.then(() => { app.listen(3000)
  console.log('Database connection successful')
})
.catch(error => {
    console.log(error.message);
    process.exit(1)
})

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
  
// })
// /