const mongoose = require("mongoose");
const app = require("./app");

// opSLMHDs74IGKtyg

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);

// console.log(process.env);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log("Database connect success");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });
