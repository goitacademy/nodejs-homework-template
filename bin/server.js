const app = require("../app");
const mongoose = require("mongoose");
require("dotenv").config();

const { DB_HOST, PORT = process.env.PORT || 3000 } = process.env;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Database connection successful! Server running. Use our API on port: ${PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
    return process.exit(1);
  });
