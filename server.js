const app = require("./app");
const { connectMongo } = require("./db/connection");

const start = async () => {
  try {
    await connectMongo();

    console.log("MongoDB server is running...");

    app.listen(3000, () => {
      console.log("Server is running. Use our API on port: 3000");
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

start();
// const mongoose = require("mongoose");
// require("dotenv").config();

// // const PORT = process.env.PORT || 3000;
// const uriDb = process.env.MONGO_URL;
// MONGO_URL = "mongodb+srv://bess777:111116@cluster0.yqnuvbs.mongodb.net/?retryWrites=true&w=majority";

// const connection = mongoose.connect(uriDb, {
//   promiseLibrary: global.Promise,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });

// connection
//   .then(() => {
//     app.listen(PORT, function () {
//       console.log(`Server is running... Use our API on port: ${PORT}`);
//     });
//   })
//   .catch((err) =>
//     console.log(`Server is not running. Error message: ${err.message}`)
//   );
// app.listen(3000, () => {
//   console.log("Server is running. Use our API on port: 3000");
// });

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then((connection) => {
//     console.log("Database connection successful!");
//   })
//   .catch((err) => {
//     console.log(err);
//     process.exit(1);
//   });
