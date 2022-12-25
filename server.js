
// rIIvlmrEdOJQinDK

const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config()



const {DB_HOST} = process.env

mongoose.set("strictQuery", true)

mongoose.connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
.catch(error => console.log(error.message))

const app = require('./app')

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})
