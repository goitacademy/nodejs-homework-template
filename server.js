const mongoose = require("mongoose");

const app = require("./app");

const DB_URI = process.env.DB_URI;

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})

mongoose
  .connect(DB_URI)
  .then(() => {console.info("Database connect success");})
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });