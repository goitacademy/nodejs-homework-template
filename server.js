import mongoose from "mongoose";
import app from "./app.js";
const uri =
  "mongodb+srv://Dima:Sinz2955800439@cluster0.sklzyye.mongodb.net/my-contacts?retryWrites=true&w=majority";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: false,
};

mongoose
  .connect(uri, options)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });
