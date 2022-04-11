const express = require("express");

const logger = require("morgan");
const cors = require("cors");
const app = express();

const contactsRouter = require("./routes/api/contacts/contacts");
const authRouter = require("./routes/api/auth/index");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/contacts/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
module.exports = authRouter;
