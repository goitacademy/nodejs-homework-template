const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const moment = require("moment");
const fs = require("fs/promises");

const contactsRouter = require("./routes/api/contacts");

const app = express();
// app - web-server
// app.listen(3000, ()=> console.log("Server running"))
const formatsLogger = app.get("env") === "development" ? "dev" : "short";


app.use(async (req, res, next) => {
  const { method, url } = req;
  const date = moment().format("DD-MM-YYYY_hh:mm:ss");
  await fs.appendFile("./public/server.log", `\n${method} ${url} ${date}`);
  next();
});

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);


app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
