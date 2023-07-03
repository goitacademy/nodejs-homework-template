const app = require("./app");
const mongoose = require("mongoose");

const { MONGO_URI, PORT } = process.env;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log("Server running. Use our API on port: 3000")
    );
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
