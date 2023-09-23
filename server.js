import mongoose from "mongoose";

import app from "./app.js";

const {DB_HOST, PORT = 3000} = process.env;

mongoose.connect(DB_HOST)
.then( () => {
  app.listen(3000, () => {
    console.log(`Database connection successful. Port: ${PORT}`)
  })
}).catch(error => {
  console.log(error);
  process.exit(1)
})







