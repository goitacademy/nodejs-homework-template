// const app = require("./app");

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });

const mongoose = require("mongoose");
const app = require("./app");

const { DB_URI, PORT = 3000 } = process.env;

async function run() {
  try {
    await mongoose.connect(DB_URI);
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  } finally {
    mongoose.disconnect();
  }
}
run().catch(console.error);
