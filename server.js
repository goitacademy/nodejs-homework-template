import mongoose from "mongoose";
import app from "./app.js";

const { PORT = 4000, DB_HOST } = process.env;

// mongoose.set("strictQuery", true);
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.massage);
    process.exit(1);
  });
