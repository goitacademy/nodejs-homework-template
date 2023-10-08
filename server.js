// const app = require('./app')

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })


const app = require('./app');

const mongoose = require('mongoose');

const DB_HOST = "mongodb+srv://Kseniya:Mo25101981@cluster0.jihsow2.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.connect(DB_HOST)
.then(() => {
  app.listen(3000, () => {
    console.log("Database connection successful")
  })
  
})
.catch(error => {
  console.log(error.message);
  process.exit(1);
});