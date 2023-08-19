import mongoose from "mongoose";
import "dotenv/config";

import app from "./app.js"



process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const {DB_HOST, PORT} = process.env;

mongoose.connect(DB_HOST)
.then(() =>{
  app.listen(PORT, () => {
    console.log(`Database connection successful. Server running. Use our API on port: ${PORT}`)
  })
})
.catch (error => {
  console.log(error.message);
  process.exit(1);
})

