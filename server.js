const mongoose =require("mongoose");

const app = require('./app');

// const {DB_HOST, PORT=4000}=process.env;

mongoose.set("strictQuery",true);
const DB_HOST = "mongodb+srv://Ihor:ptQvw*8PdgWQsZH@cluster0.qbxqqlz.mongodb.net/db-contacts?retryWrites=true&w=majority"

mongoose.connect(DB_HOST)
.then(()=> {
app.listen(3000)
console.log("Database connect success")
})
.catch(error => {
  console.log(error.message);
  process.exit(1);
})

