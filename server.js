import mongoose from "mongoose"
import app from "./app.js"


// A4ccbeXSwJYEyZW8

const DB_HOST = "mongodb+srv://swefart:A4ccbeXSwJYEyZW8@cluster0.y0bzndm.mongodb.net/db-contacts?retryWrites=true&w=majority"

mongoose.connect(DB_HOST).then(() => {
  app.listen(3000, () => {
    console.log("Database connection successful")
  })
}).catch(error => {
  console.log(error.message);
  process.exit(1);
})
