import mongoose from "mongoose";
import dotenv from "dotenv"

import app from "./app.js";

dotenv.config()

const { DB_HOST, PORT } = process.env
 

mongoose.connect(DB_HOST).then(() => {app.listen(PORT, () => {
  console.log("Database connection successful");
});}).catch(error => { console.log(error); process.exit(1)})

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });

// RSrhs4t2MvwoSt4W
