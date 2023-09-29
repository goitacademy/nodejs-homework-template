const app = require('./app')
const mongoose = require('mongoose')


// mm15ulNAnlgUY4f8\
const DB_HOST = 'mongodb+srv://Nikita:mm15ulNAnlgUY4f8@cluster0.7u0vxxh.mongodb.net/db-contacts?retryWrites=true&w=majority&appName=AtlasApp'

mongoose.connect(DB_HOST)
  .then(() =>
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000")
    }))
  .catch((error) => {
    console.log(error.message)
    process.exit(1)
  }) 

