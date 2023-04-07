const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT = 3003 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(PORT))
  .then(() => console.log("Server running. Use our API on port: 3003"))
  .then(() => console.log("connected"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// app.listen(PORT, () => {
//   console.log("Server running. Use our API on port: 3003");
// });
