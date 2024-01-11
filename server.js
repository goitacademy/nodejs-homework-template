import mongoose from "mongoose";

import app from "./app.js";

const DB_Host =
  "mongodb+srv://werb:9JFYNJiOUnDGw3mf@cluster0.ouq18we.mongodb.net/db-contacts?retryWrites=true&w=majority";
mongoose
  .connect(DB_Host)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
