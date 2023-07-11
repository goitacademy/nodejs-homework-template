const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const Joi = require("joi");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email(),
  phone: Joi.string().min(14).max(14),
});

// =================================================MIDDLEWARES=======================================
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      res.status(400).json(error.details[0].message);
    }
  } else {
    next();
  }
});

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
