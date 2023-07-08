const app = require('./app')
const mongoose = require('mongoose')
require("dotenv").config();
// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })
// "mongodb+srv://marik123:chebjolik@cluster0.tdovase.mongodb.net/contacts_reader?retryWrites=true&w=majority"
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Database connection successful");
  app.listen(process.env.PORT);
  console.log(`Server running. Use our API on port: ${process.env.PORT}`)
}).catch((err) => {
  console.log(err.massage);
  process.exit(1)
})
