import mongoose from "mongoose";
import app from "./app.js";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: false,
};

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST, options)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });
