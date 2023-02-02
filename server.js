const app = require("./app");
const mongoose = require("mongoose");

require("dotenv").config();

const { PORT = 3000, DB_HOST } = process.env;

mongoose.set("strictQuery", false);

main().catch((err) => {
  console.error("Error while connecting to mongoDb.", err.message);
  process.exit(1);
});

async function main() {
   mongoose.connect(DB_HOST, () =>
    console.log("Database connection successful")
  );

  app.listen(PORT, (err) =>
    err
      ? console.error("Error at server launch", err.message)
      : console.log(`Server running. Use our API on port: ${PORT}`)
  );
}