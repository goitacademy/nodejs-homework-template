const mongoose = require("mongoose");
require("dotenv").config();

const DB_URI = process.env["DB_URI"];

// mongoose
//   .connect(DB_URI)
//   .then(() => console.log("database connected"))
//   .catch((error) => {
//     console.log(error);
//     process.exit(1);
//   });

async function run() {
  try {
    await mongoose.connect(DB_URI);
    console.log("database connected!!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

run();
