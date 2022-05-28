const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");
// const contacts = require("./db/contacts.json");

const app = express();

// app.get("/", (req, res) => {
//   res.json({
//     status: "success",
//     code: 200,
//     data: {
//       result: contacts,
//     },
//   });
// });

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  // res.send("<h2>Some message</h2>");
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: message });
});

module.exports = app;
