const app = require('./app')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3001
const uriDb = 'mongodb+srv://marina:Passw0rd123@cluster0.67bq4qo.mongodb.net/db-contacts?retryWrites=true&w=majority'

const connection = mongoose.connect(uriDb)

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Database connection successful.`)
    })
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1)
  });
