const mongoose = require("mongoose");
const app = require("./app");

const dotenv = require("dotenv");
dotenv.config();
mongoose.set("strictQuery", false);

const { HOST_URI } = process.env;

async function main() {
  try {
    const PORT = 3000;
    await mongoose.connect(HOST_URI);
    console.log("Database connection successful");

    app.listen(PORT, () =>
      console.log(
        `Server running. Use our API on port http://localhost:${PORT}/ `
      )
    );
  } catch (error) {
    console.error("Error while connecting to mongodb", error.message);
    process.exit(1);
  }
}
main();
