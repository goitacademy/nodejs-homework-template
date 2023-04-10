const mongoose = require("mongoose");

const { DB_HOST } = require("./config");

const app = require("./app");

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    })
  )
  .catch((error) => console.log(error.message));
