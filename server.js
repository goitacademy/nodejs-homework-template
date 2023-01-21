const app = require('./app')
const mongoose = require('mongoose')

const dotenv = require("dotenv")
const { Db_HOST,PORT=3000 } = process.env;
dotenv.config()


// const Db_HOST = "mongodb+srv://Vitya:5OiKWi1pOG9oKZ0H@cluster0.srjncdi.mongodb.net/?retryWrites=true&w=majority"
// const { Db_HOST } = require("./config")
// console.log(process.env)
mongoose.set("strictQuery", true)

mongoose.connect(Db_HOST)
  .then(() =>
    app.listen(PORT, () => console.log(`Database connection successful on PORT :3000`))
  )
.catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })
