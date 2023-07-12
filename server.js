const app = require("./app");

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});

// m1n3KiEVI3Lb5qci

// const mongoose = require("mongoose");

// const app = require("./app");

// // const url = process.env.DB_HOST;
// const DB_HOST =
//   "mongodb+srv://Ruslan:m1n3KiEVI3Lb5qci@cluster0.bvujnmt.mongodb.net/db-contacts?retryWrites=true&w=majority";


// mongoose
//   .connect(DB_HOST, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   })
//   .then(() => {
//     app.listen(3000, () => {
//       console.log("Database connection successful");
//     });
//   })
//   .catch((error) => {
//     console.log(error.message);
//     process.exit(1);
//   });
