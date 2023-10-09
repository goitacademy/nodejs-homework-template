const mongoose = require("mongoose");
const app = require("./app");
const { error } = require("./schema");
//PhHzLrFsBNB0Jy8f

const PORT = 5000;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
