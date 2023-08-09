const app = require("./app");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? "./environments/production.env"
      : "./environments/development.env",
});

const { MONGO_URL, PORT } = process.env;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Database connection successful. Use our API on port: ${PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose error: ${err.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

process.on("SIGINT", async () => {
  mongoose.connection.close(() => {
    console.log("Connection to DB closed and app terminated");
    process.exit(1);
  });
});
