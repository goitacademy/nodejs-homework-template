import mongoose from "mongoose";

import app from "./app.js";

const { DB_HOST, PORT } = process.env;
mongoose.connect(DB_HOST)
  .then(() => {
  app.listen(3001, () => {
  console.log(`Database connection successful. Server running. Use our API on port: ${PORT}`)
})

})
