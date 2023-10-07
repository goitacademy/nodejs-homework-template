const app = require("./app");
require("dotenv").config();
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5001;
const CONNECTION_STRING = process.env.MONGO_URL;

mongoose
  .connect(CONNECTION_STRING)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
