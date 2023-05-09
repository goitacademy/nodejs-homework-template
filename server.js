const mongoose = require("mongoose");

const app = require("./app");

const {DB_HOST, PORT = 3000} = process.env;

mongoose.set('strictQuery', true)

mongoose.connect("mongodb+srv://Inna:19101974@cluster0.xeetnqb.mongodb.net/db-contacts?retryWrites=true&w=majority")
.then(() => {
  app.listen(PORT);
  console.log("Server is running on port 3000")
})
.catch(error => {
  console.log(error);
  process.exit(1)
})

