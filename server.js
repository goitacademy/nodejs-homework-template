const mongoose = require('mongoose');

const app = require('./app')

const DB_URL="mongodb+srv://Diana:182fagMFMTZ9Kbfi@diana.qpbl3yu.mongodb.net/?retryWrites=true&w=majority"


mongoose.connect(DB_URL)
.then(()=>{
  console.log("Database connection successful")
  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000")
  })
})
.catch((error)=>{
  console.log(error.message);
  process.exit(1);
})