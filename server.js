const mongoose = require("mongoose");
const app = require("./app");

const { MONGO_URL, PORT } = process.env;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });

    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log("err", err.message);
    process.exit(1);
  });
