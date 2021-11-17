/* eslint-disable quotes */
/* eslint-disable semi */
const app = require("../app.js");
require("dotenv").config();

const { PORT, DB_HOST } = process.env;

const mongoose = require("mongoose");
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("DB successfuly connected");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(console.error());
