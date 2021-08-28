const app = require("../app");
const db = require("../model/db");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// dotenv.config();
const { PORT = 3000 } = process.env;
db.then(
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  })
).catch((error) => console.log(error.message));
