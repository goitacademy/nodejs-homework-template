const mongoose = require("mongoose");
const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

// const {DB_HOST} = require("./config");

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// mongoose.connect(DB_HOST)
// .then(() => console.log("Database connect success"))
// .catch(error => console.log(error.message))
