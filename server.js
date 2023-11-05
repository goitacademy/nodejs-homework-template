import app from "./app.js";
import mongoose from "mongoose";

const PORT = 3000,DB_HOST  = "mongodb+srv://Marino3ka:M6ALuKQFWiEyWk22@cluster0.kzuvocw.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);


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
