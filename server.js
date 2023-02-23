const app = require("./app");

const mongoose = require("mongoose");
// const { DB_HOST } = require('./config')
const { DB_HOST, PORT= 3000 } = process.env;

// mongoose.set("strictQurey", true);
mongoose.set("strictQuery", true);

// console.log(process.env);

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000");
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// })
