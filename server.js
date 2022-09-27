const app = require('./app')
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();


const { PORT, DB_HOST } = process.env;

mongoose.connect(DB_HOST)
  .then(() => app.listen(PORT, () => {
      console.log('Database connection successful')
    }),
  )
  .catch(error => {
    console.log(error)
    process.exit(1)
  })
  

  
/*const mongoose = require("mongoose");
const DB_HOST = "mongodb+srv://serg:gogogo@cluster0.nz0mya6.mongodb.net/db-contacts?retryWrites=true&w=majority"
const PORT = 3000



mongoose.connect(DB_HOST)
  .then(() => 
      console.log('Database connection successful')
    ,
  )
  .catch(error => {console.log(error)
    process.exit(1)
  })
*/