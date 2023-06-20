const app = require("./app");
const mongoose = require("mongoose");

require("dotenv").config();
const uriDb = process.env.DB_HOST;


app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    console.log(`Database connection successful`);
  })
  .catch((error) => {
    console.log("Database connection unsuccessful. Error: ", error);
    process.exit(1);
  });
