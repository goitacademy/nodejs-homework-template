const app = require("./app");
const mongoose = require("mongoose");
const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then((resp) => {
    app.listen(PORT, () => {
      console.log(`Database connection successful`);
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
