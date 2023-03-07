const { app } = require("./app");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const dotenv = require("dotenv");

dotenv.config();

const { HOST_URI } = process.env;
async function main() {
  try {
    await mongoose.connect(HOST_URI);
    console.log("connected to db");

    app.listen(3001, () => {
      console.log("server is listening on port 3001");
    });
  } catch (error) {
    console.log("Error", error.message);
    process.exit(1);
  }
}
main();
