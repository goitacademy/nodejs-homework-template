const app = require('./app')
const {DB_HOST, PORT = 3000} = process.env
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect(DB_HOST)
.then(() => { app.listen(PORT)
  console.log('Database connection successful')
})
.catch(error => {
    console.log(error.message); 
    process.exit(1)
})
console.log(DB_HOST)
// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
  
// })
