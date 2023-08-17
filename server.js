const app = require("./app");
const mongoose = require("mongoose");

require("colors");
require("dotenv").config();

const { DEV_SERVER_PORT = 3000, DB_USER, DB_PASS, DB_NAME } = process.env;

const HOST = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.domin4s.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.set("strictQuery", true);

mongoose
  .connect(HOST)
  .then(() =>
    app.listen(DEV_SERVER_PORT, () => {
      console.log(
        `Server running. Use our API on port: ${DEV_SERVER_PORT}`.black
          .bgBrightGreen
      );
    })
  )
  .catch((error) => {
    console.log(error.message.black.bgBrightRed);
    process.exit(1);
  });
