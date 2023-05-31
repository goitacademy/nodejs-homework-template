const mongoose = require("mongoose")

const app = require('./app')

const { DB_HOST } = require('./config')
 
mongoose.set('strictQuery',true)

// mongoose.connect(DB_HOST)
// .then(()=> console.log("connect"))
// .catch( error => console.log(error.message))


mongoose.connect(DB_HOST)
.then(()=> {
  app.listen(3000, () => {
    console.log("Database connection successful")
  })
})
.catch(error => {
  console.log(error.message)
  process.exit(1);
})



