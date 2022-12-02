// const express = require("express");
// const logger = require("morgan");
// const cors = require("cors");
// // const mongoose = require('mongoose');
// const cookieParser  =  require ( 'cookie-parser' )

// require('dotenv').config();
// const router = require("./routes/api/contacts");

// const app = express();
// app.use(cookieParser())
// const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// app.use(logger(formatsLogger));
// app.use(
//   cors({
//     origin: "*",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//   })
// );
// app.use(express.json());

// app.use("/", router);

// app.use((req, res) => {
//   res.status(404).json({ message: "Not found" });
// });

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message });
// });

// module.exports = app;
