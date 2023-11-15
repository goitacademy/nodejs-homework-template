const mongoose = require("mongoose");
const app = require("./app");

const { DB_URI, PORT = 3000 } = process.env;
// console.log(DB_URI);

if (!DB_URI) {
  console.error(
    "DB_URI is not provided. Make sure to set it in your environment variables."
  );
  process.exit(1);
}

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_URI)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Database connection successful");
    })
  )
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
