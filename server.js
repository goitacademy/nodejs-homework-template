require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");


const { PORT, DB_URL } = process.env;

(async () => {
  await mongoose.connect(DB_URL);
  console.log("Database connection success");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();


