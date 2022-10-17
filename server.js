const app = require('./app')

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})


const mongoose = require('mongoose')

const DB_HOST = "mongodb+srv://Ed:<password>@cluster0.ozlrlwg.mongodb.net/contacts_reader?retryWrites=true&w=majority"

mongoose.connect(DB_HOST)
  .then(() => console.log("Database connect succes"))
  .catch(error => console.log(error.message))
