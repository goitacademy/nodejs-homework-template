const mongoose = require("mongoose");
const app = require("./app");

const { MONGO_URL, PORT = 3000 } = process.env;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("error:", error.message);
    process.exit(1);
  });
