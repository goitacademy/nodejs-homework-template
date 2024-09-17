// const mongoose = require("mongoose");
// const app = require("./app");

// // const { DB_HOST } = process.env;npm install mongodb

// const PORT = process.env.PORT || 3000;
// const uriDb = process.env.DB_HOST || "mongodb://localhost:27017/contacts";

// const connection = mongoose.connect(uriDb, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// connection
//   .then(() => {
//     app.listen(PORT, function () {
//       console.log(`Server running. Use our API on port: ${PORT}`);
//     });
//   })
//   .catch((err) =>
//     console.log(`Server not running. Error message: ${err.message}`)
//   );
const mongoose = require("mongoose");
const app = require("./app");

const DB_HOST = process.env.DB_HOST || "mongodb://localhost:27017/contacts";

console.log(DB_HOST);
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
