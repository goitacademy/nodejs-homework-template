import app from "./app.js";
import mongoose from "mongoose";

const DB_HOST = "mongodb+srv://Marino3ka:M6ALuKQFWiEyWk22@cluster0.kzuvocw.mongodb.net/my-contacts?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log('Database connect')
    })
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });


//M6ALuKQFWiEyWk22 