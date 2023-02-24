const mongoose = require("mongoose");

const app = require("./app");

const { MONGODB_URL, PORT = 3000 } = process.env;

mongoose
  .connect(MONGODB_URL)
  .then(() => app.listen(PORT))
  .then(console.log(`Database connection successful on port = ${PORT}`))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
