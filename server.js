const app = require('./app')
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config()

const PORT = process.env.PORT || 3000
const uriDb = process.env.DB_HOST


const connectionOptions = {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
};


 

mongoose.connect(uriDb, connectionOptions)
  .then(() => {
      app.listen(PORT, () => {
    console.log("Database connection successful", mongoose.connection.name)
  })
  })
  .catch((err) => {
  console.log(`Server not running. Error message: ${err.message}`)
  process.exit(1)
  })
   







// const connection = mongoose.connect(uriDb, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// })



// connection.then(()=>{
//   app.listen(PORT, () => {
//     console.log("Database connection successful")
//   })
// }).catch((err)=>{
//   console.log(`Server not running. Error message: ${err.message}`)
//   process.exit(1)
  
// })

