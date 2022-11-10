import mongoose from "mongoose";
import app from "./app.js";

const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT;

mongoose.connect(DB_URI).then(() => {
  console.log('Database connection successful!')
  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
}).catch(err => {
  console.log(err.message)
  process.exit(1);
})
