const app = require("./app");
const mongoose = require("mongoose");

require("dotenv").config();

const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGO_URL)
  .then((con) => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
    console.log("Database connection successful..");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
