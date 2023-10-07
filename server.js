const mongoose = require("mongoose");
const app = require("./app");
const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connect success 🚀");
    app.listen(3000, () => {
      console.log("🐝 Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log("Database connect error 🙁", error.message);
    process.exit(1);
  });
