// PASS: 3dTo7WFoKceVTvZa
const mongoose = require("mongoose");

const app = require("./app");
const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
