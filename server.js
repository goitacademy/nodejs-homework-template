
// rIIvlmrEdOJQinDK

const mongoose = require("mongoose");

const DB_HOST = "mongodb+srv://Yevgen:rIIvlmrEdOJQinDK@cluster0.a346oin.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", true)

mongoose.connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
.catch(error => console.log(error.message))

const app = require('./app')

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})
