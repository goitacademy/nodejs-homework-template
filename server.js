const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config();

async function main() {
  try {
    await mongoose.connect(process.env.DB_HOST);
    console.log("connected to db");

    app.listen(3000, () => {
      console.log(
        "Database connection successful. Server is listening on port 3001"
      );
    });
  } catch (error) {
    console.error("main failed:", error.message);
    process.exit(1);
  }
}
main();