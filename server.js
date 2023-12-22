import mongoose from "mongoose";
import app from "./app.js";

const DB_HOST =
  "mongodb+srv://haberserhii:SeHV0riXcNLSKRSH@maincluster.pcu4446.mongodb.net/my-contacts";
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
