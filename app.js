const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const contactsService = require("./models/contacts.json");

const contactsRouter = require("./routes/api/contacts-router.js");

const app = express();

app.listen(3001, () => console.log("Server runnig on 3001 PORT"));

app.get("/", (req, res) => {
  res.send("<h1> Home page</h1>");
});

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
