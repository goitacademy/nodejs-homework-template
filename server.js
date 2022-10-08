const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

(async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log("Database connection successful");
    app.listen(PORT);
    console.log(`Server running. Use our API on port: ${PORT}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
})();
