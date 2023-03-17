const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});

const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URL;

console.log(mongoUri);

const connection = mongoose.connect(mongoUri, {
  promiseLibrary: global.Promise,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`)
  );

// const MONGO_URL = process.env.MONGO_URL;

// // if (NODE_ENV === "development") app.use(morgan("dev"));
// mongoose
//   .connect(MONGO_URL)
//   .then((connection) => {
//     console.log(connection);
//   })
//   .catch((err) => {
//     console.log(err);

//     process.exit(1);
//   });
