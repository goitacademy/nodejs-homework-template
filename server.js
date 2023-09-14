const app = require('./app')

const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://elisarrar:qI7sQ3LpZ7iqmLZm@cluster0.5wfiqlw.mongodb.net/db-contacts?retryWrites=true&w=majority";

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
