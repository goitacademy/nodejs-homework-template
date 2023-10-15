const app = require("./app");
const mongoose = require("mongoose");
const { DB_HOST } = require("./config");

mongoose.set("strictQuery", true);

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
