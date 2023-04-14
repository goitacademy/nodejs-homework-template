const mongoose = require("mongoose");

const app = require("./app");

// 0LB8y0bcaLb86zG2

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => console.log(error.message));
