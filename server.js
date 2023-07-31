const mongoose = require("mongoose");
const app = require("./app");

const { PORT = 3001, DB_HOST } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
      console.log("Server running. Use our API on port: 3001");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
