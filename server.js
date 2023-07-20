const app = require("./app");
const mongoose = require("mongoose");
require("colors");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful".green.bold.italic);
      console.log(
        `Name: ${mongoose.connection.name}. Host: ${mongoose.connection.host}. PORT: ${mongoose.connection.port}`
          .green.bold.italic
      );
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
