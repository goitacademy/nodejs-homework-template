// const app = require('./app')
// const mongoose = require("mongoose");

// const DB_HOST = "mongodb+srv://Roman:XH53-bcvknNeK_U@cluster0.rzyq7nr.mongodb.net/db-contacts?retryWrites=true&w=majority"

// mongoose.set("strictQuery", true);

// const mongoose.connect(DB_HOST)
// .then(() => {console.log("Database connection successful");
//   // app.listen(PORT);
// })
// .catch((err) => {
//   console.log(err.message);
//   // process.exit(1);
// });




// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })

// ....................................................................................
// const app = require("./app");
// const mongoose = require("mongoose");

// const { DB_HOST, PORT = 3000 } = process.env;

// mongoose.set("strictQuery", true);

// mongoose
//   .connect(DB_HOST)
//   .then(() => {
//     console.log("Database connection successful");
//     app.listen(PORT);
//   })
//   .catch((err) => {
//     console.log(err.message);
//     process.exit(1);
//   });
// ..................................................................................
const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST = "mongodb+srv://Roman:XH53-bcvknNeK_U@cluster0.rzyq7nr.mongodb.net/db-contacts?retryWrites=true&w=majority"

mongoose.set("strictQuery", true);

mongoose.connect(DB_HOST)
  .then(() => {
    // console.log("Database connection successful");
    app.listen(3000);
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })