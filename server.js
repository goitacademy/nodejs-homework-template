import app from "./app.js";
import mongoose from "mongoose";

const { PORT, DB_HOST } = process.env;
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
