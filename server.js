require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

(async function () {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database connection successful`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
  app.listen(3000, () => {
    console.log(`Server running. Use our API on port: 3000`);
  });
})();
