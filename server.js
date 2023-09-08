const mongoose = require('mongoose');
const app = require('./app')
const DB_HOST = `mongodb+srv://Viktor:DoU4x60KGTGnw5zi@cluster0.ys6ckzs.mongodb.net/db-contacts?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

mongoose.connect(DB_HOST, { useNewUrlParser: true })
  .then(() => {
    app.listen(3000)
    console.log("Database connected")
  })
  .catch(error => {
    console.log(error.message)
    process.exit(1)
  })





