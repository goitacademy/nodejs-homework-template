const app = require("./app");
const mongoose = require("mongoose");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", false);
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
  })

  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })
//mongodb+srv://Dmytro:Bi..........54@cluster0.jga5tum.mongodb.net/?retryWrites=true&w=majority
// const mongoose = require("mongoose");
// const DB_HOST =
//   "mongodb+srv://Dmytro:Bibina753654@cluster0.jga5tum.mongodb.net/?retryWrites=true&w=majority";
