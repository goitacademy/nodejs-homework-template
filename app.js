require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;

// const express = require("express");
// const app = express();
// // const fs = require("fs").promises;

// const uuid = require("uuid").v4;

// app.use(express.json());

// app.get("/ping", (req, res) => {
//   console.log(req);

//   // res.sendStatus(200);
//   // res.status(200).send(`<h1>Hello ${port} server</h1>`);
//   res.status(200).json({
//     msg: "pong!",
//   });
// });

// app.post("/users", (req, res) => {
//   try {
//     const { name, year } = req.body;

//     const newUser = {
//       name,
//       year,
//       id: uuid(),
//     };

//     res.status(201).json({
//       msg: "Success",
//       user: newUser,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// const port = 3000;

// app.listen(port, () => {
//   console.log(`Hello ${port} port`);
// });
