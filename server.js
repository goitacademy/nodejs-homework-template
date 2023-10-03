const app = require("./app");

const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Yuliya:yJf8yT9hnarSMeJq@cluster0.dwyka8f.mongodb.net/db-contacts";
app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(300);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
