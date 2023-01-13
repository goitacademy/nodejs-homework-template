const { mongoose } = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");
const { exit } = require("node:process");
dotenv.config();
mongoose.set("strictQuery", false);

const { MONGO_URI } = process.env;

async function main() {
  try {
    await mongoose
      .connect(MONGO_URI)
      .then(() => console.log("Database connection successful"))
      .catch((err) => {
        console.error("Error with database connection:", err.message);
        exit(1);
      });
    app.listen(3000, () => {
      console.log("Server is running on port: 3000");
    });
  } catch (err) {
    console.error("error:", err.message);
  }
}

main();
