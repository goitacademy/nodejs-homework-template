const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api");
const authRouter = require("./routes/api/authRouter");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
require("./config/passport");

// console.log("authRouter", authRouter);
app.use("/api/users", authRouter);
app.use("/api/user", authRouter);
app.use("/", (req, res) => {
  res.status(404).json({message: "Not found!"});
});

app.use((err, _, res, __) => {
  const {status = 500, message = "Internal Server Error"} = err;
  res.status(status).json(message);
});

module.exports = app;


// const app = require("./app");
// const mongoose = require("mongoose");
// const {HOST_DB, PORT} = require("./config");
// const db = mongoose.connect(HOST_DB);

// db.then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running!!! Use our API on port: ${PORT}`);
//   });
// }).catch((err) => {
//   console.log(`Server not running. Error message: ${err.message}`);
//   process.exit(1);
// });

// const start = async () => {
//   try {
//     mongoose.connect(HOST_DB);
//     app.listen(PORT, () => {
//       console.log(`Server running. Use our API on port: ${PORT}`);
//     });
//   } catch (error) {
//     console.error("Failed to start server with error: ", error.message);
//     process.exit(1);
//   }
// };

// start();
