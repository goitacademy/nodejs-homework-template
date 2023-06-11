const mongoose = require("mongoose");

const app = require("./app.js");

const { DB_HOST, PORT = 3000 } = process.env;

async function main() {
  await mongoose.connect(DB_HOST);

  console.log("Database connection successful");

  app.listen(PORT, () => {
    console.log(`Server is running on port 3000`);
  });
}

main().catch((error) => {
  console.log(error.message);
  process.exit(1);
});
