import mongoose from "mongoose";

import app from "./app.js";

mongoose.connect(process.env.DB_HOST)
.then( () => {
  app.listen(3000, () => {
    console.log("Database connection successful.")
  })
}).catch(error => {
  console.log(error);
  process.exit(1)
})



