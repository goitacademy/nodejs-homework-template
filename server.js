import app from './app.js';
import mongoose from 'mongoose';

const DB_HOST = "mongodb+srv://vovaprodan:10101997vikA@cluster0.jpszghr.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.connect(DB_HOST)
  .then(() => {
app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
  console.log("Database connection successful")
})
  }).catch(error => {
    console.log(error.message);
    process.exit(1);
  })


