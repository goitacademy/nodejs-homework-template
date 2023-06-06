//https://nodejs-homework-rest-api-uuow.onrender.com/api/contacts

const mongoose = require("mongoose")

const app = require('./app')

const { DB_HOST,PORT = 3000} = process.env;

console.log(`DB_HOST :`,DB_HOST);
 
mongoose.set('strictQuery',true)



mongoose.connect(DB_HOST)
.then(()=> {
  app.listen(PORT, () => {
    console.log("Database connection successful")
  })
})
.catch(error => {
  console.log(error.message)
  process.exit(1);
})



 