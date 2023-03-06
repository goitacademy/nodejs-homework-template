const express = require("express");
const cors = require("cors");

require("dotenv").config();

const connectDB = require("./src/database/connection");

const app = express();

const PORT = process.env.PORT || 5050;

// parse application/json
app.use(express.json());
// cors
app.use(cors());

const contactsRouter = require("./src/routes/api/contacts");
app.use("/api", contactsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  console.log("404: Not found");
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
  next();
});

// error handler
app.use((err, req, res, next) => {
  console.log("status 500");
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
  next();
});

app.listen(PORT, async () => {
  console.log("db connecting...".bgGray.bold.italic);
  await connectDB();
  console.log(
    `Database connection successful on port: ${PORT}`.bgGreen.bold.italic
  );
});

// const PORT = process.env.PORT || 5050;
// const uriDb = process.env.DB_HOST;

// const connection = mongoose.connect(uriDb, {
//   promiseLibrary: global.Promise,
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
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
