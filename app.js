const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const Joi = require("joi");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

const contactForm = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(7).required(),
});

function validateContact(req, res, next) {
  const { error } = contactForm.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Missing required name field" });
  }
  next();
}

app.get("/api/contacts", req);

// app.use("/api/contacts", contactsRouter);

// app.use((req, res) => {
//   res.status(404).json({ message: "Not found" });
// });

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message });
// });

module.exports = app;
