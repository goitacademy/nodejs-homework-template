import app from "./app.js";
import mongoose from "mongoose";

const { BASE_URL, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);

async function startServer() {
  try {
    await mongoose.connect(BASE_URL);
    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startServer();
