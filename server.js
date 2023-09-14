


import mongoose from 'mongoose'
import app from './app.js'

const DB_HOST =
  "mongodb+srv://Brod9ga:7P9ICK90aYeSY1yn@cluster0.pgs52lm.mongodb.net/MyContacts?retryWrites=true&w=majority";

mongoose.connect(process.env.DB_HOST)
  .then(() => {
  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000");
  });
  }).catch((error) => {
    console.log(error.message);
    process.exit(1);
})

