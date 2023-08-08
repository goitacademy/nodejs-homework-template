import mongoose from "mongoose";
import "dotenv/config"

import app from "./app.js";

const { DB_HOST, PORT } = process.env;
  

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful")
      console.log(`Server running. Use our API on port: ${PORT}`);
    })
  })
  .catch(error => {
    console.log(error.massage);
    process.exit(1);
  });



// XnqyMS3p2WvdHuDN
// Helen
