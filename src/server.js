const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 3000;
const { HOST_URI } = process.env;

mongoose.set("strictQuery", false);

// eslint-disable-next-line require-jsdoc
async function main() {
  try {
    await mongoose.connect(HOST_URI);
    console.log("Database connection successful");
  } catch (error) {
    console.error("Error while connecting to mongoDb", error.massage);
    process.exit(1);
  }
}

main()
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`)
  );
