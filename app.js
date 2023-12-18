const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");
const { addSchema, updateSchema, updateStatusSchema } = require("./middlewares/validateContacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  if (req.method === "POST") {
    const validateResult = addSchema.validate(req.body);
    if (validateResult.error) {
      return res.status(400).json({ message: validateResult.error });
    }
  } else if (req.method === "PUT") {
    const validateResult = updateSchema.validate(req.body);
    if (validateResult.error) {
      return res.status(400).json({ message: validateResult.error });
    }
  }
  next();
});

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
