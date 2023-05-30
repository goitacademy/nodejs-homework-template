const mongoose = require("mongoose");

const app = require('./app')

const DB_HOST =
  "mongodb+srv://evgenstb:nglLosXuqJJzeBqL@contacts.bhadyzz.mongodb.net/db_conacts?retryWrites=true&w=majority";

  mongoose.set('strictQuery', true)

mongoose.connect(DB_HOST).then (()=> {
  console.log("Connection for DB succesful")
  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000")
  })
}).catch(error=> {
  console.log(error.message);
  process.exit(1)
})
