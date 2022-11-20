const app = require("./app");

const mongoose = require("mongoose");

const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`The server is listening on port: ${PORT}`)
    )
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
