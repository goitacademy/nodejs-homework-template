const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");
const { URL, PORT = 3000 } = process.env;
mongoose
  .connect(URL)
  .then(() =>
    app.listen(PORT, () =>
      console.log("Database connection successful. Use our API on port: 8080")
    )
  )
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
