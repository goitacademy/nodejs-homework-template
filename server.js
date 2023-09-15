const app = require('./app')

const mongoose = require("mongoose");
const { DB_HOST } = require('./config');

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch((e) => {
    console.log(e.message);
    process.exit(1)
  });

app.listen(4000, () => {
  console.log("Server running. Use our API on port: 4000")
})
