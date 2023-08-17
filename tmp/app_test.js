// const express = require("express");
// const contacts = require("./models/contacts.json");
// const fs = require("fs/promises");

// const app = express();

// app.listen(3001, () => console.log("The server was started on port 3001."));

// app.use(async (req, res, next) => {
//   const { method, url } = req;
//   const date = Date.now();
//   await fs.appendFile("./server.log", `\n${method} | ${url} | ${date}`);
//   next();
// });

// app.get("/", (req, res) => {
//   res.send("<h1>Main page</h1>");
// });

// app.get("/contacts", (req, res) => {
//   res.json(contacts);
// });

// app.get("/contacts/:id", (req, res) => {
//   res.send(`<h1>Contact page</h1> Parameter: ${req.params.id}`);
// });

// app.use((req, res, next) => {
//   res.status(404).json({ message: "Not Found" });
// });
// // app.get("*", (req, res) => {
// //   res.send(`<h1>Page ${req.url} not found</h1>`);
// //   console.log(req);
// // });
const path = require("path");
const env = path.join(__dirname, "..", ".env");
require("dotenv").config({ path: env });
const mongoose = require("mongoose");

const { DB_USER, DB_PASS, DB_NAME } = process.env;
console.log(DB_USER);
console.log(DB_PASS);
console.log(DB_NAME);

const HOST = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.domin4s.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(HOST)
  .then(() => {
    console.log("Database success connect");
  })
  .catch((error) => console.log(error.message));
