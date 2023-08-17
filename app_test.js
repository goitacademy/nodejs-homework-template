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

const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://userbase:V5XIz2P8pT0kXvZw@cluster0.domin4s.mongodb.net/db_contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database success connect");
  })
  .catch((error) => console.log(error.message));
