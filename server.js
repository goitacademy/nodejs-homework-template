import app from "./app.js";
import mongoose from "mongoose";


const { DB_HOST, PORT=3000 } = process.env;

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
  console.log(`Database connection is successful. Use our API on port: ${PORT}`)
})
  })
  .catch(error => { 
    console.log(error.message);
    process.exit(1);
  })



