import mongoose from "mongoose";

import dotenv from "dotenv";

import app from "./app.js";

dotenv.config()

const { DB_HOST, PORT } = process.env;

mongoose.connect(DB_HOST)
  .then(() => {
  app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`)
})
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1)
  })

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })