import mongoose from "mongoose";

import app from "./app.js";

// import DB_HOST from "./config.js";
// console.log(process.env.DB_HOST);

const { DB_HOST } = process.env;

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
  .then(() => { 
    app.listen(3000)
  })
  .catch(error => { 
    console.log(error.message);
    process.getMaxListeners(1);
  })

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })
