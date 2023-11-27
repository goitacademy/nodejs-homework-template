

const mongoose = require("mongoose")

const app = require('./app')

const DB_HOST = "mongodb+srv://Denis:R$$Xr$2P*AkrfU4@cluster0.oaexovo.mongodb.net/contacts_reader?retryWrites=true&w=majority"

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000")
    })
  })
  .catch(error =>{
    console.log(error.message)
    process.exit(1)
  })
