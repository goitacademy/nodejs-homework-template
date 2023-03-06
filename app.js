// const express = require("express");
// const logger = require("morgan");
// const cors = require("cors");

// const contactsRouter = require("./src/routes/api/contacts");

// const app = express();

// const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// app.use(logger(formatsLogger));
// app.use(cors());
// app.use(express.json());

// app.use("/api", contactsRouter);

// app.use((req, res, next) => {
//   console.log("404: Not found");
//   res.status(404).json({ status: "error", code: 404, message: "Not found" });
//   next();
// });

// app.use((err, req, res, next) => {
//   console.log("status 500");
//   res.status(500).json({
//     status: "fail",
//     code: 500,
//     message: err.message,
//     data: "Internal Server Error",
//   });
//   next();
// });

// module.exports = app;
