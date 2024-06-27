//const app = require('./app')
/* const app = require('./app')
app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})

 */
const mongoose = require("mongoose")
const app = require('./app')
const { DB_HOST, PORT } = process.env

mongoose.set('strictQuery', true)

mongoose
  .connect(DB_HOST)
  .then(() => 
  app.listen(PORT, () => {
    console.log("Database connection successful")
  }))
  .catch((error)=> {
    console.log(error.message);
    process.exit(1);
  });
