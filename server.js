const mongoose = require("mongoose");
mongoose.set("debug", true);
const app = require("./app");

const { HOST_URI } = process.env;
const { PORT } = process.env;
async function main() {
  try {
    await mongoose.connect(HOST_URI);
    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (error) {
    console.log("Error while connecting to monodb", error.message);
    process.exit(1);
  }
}

main();
