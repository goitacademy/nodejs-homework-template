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
const env = path.join(__dirname, "config", ".env");
require("dotenv").config({ path: env });
const mongoose = require("mongoose");

console.log(process.env.DB_NAME);
// const DB_USER = process.env.DB_USER;

const DB_HOST = null;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database success connect");
  })
  .catch((error) => console.log(error.message));
