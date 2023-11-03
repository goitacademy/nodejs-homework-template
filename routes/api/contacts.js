const express = require("express");
const contacts = require("../../models/contacts");
const router = express.Router();
const Joi = require("joi");
const errorChecker = require("./errorChecker");

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  phone: Joi.string().pattern(/^\+\d{3}-\d{2}-\d{3}-\d{2}-\d{2}$/),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

router.get("/", async (req, res, next) => {
  const data = await contacts.listContacts();
  res.json(data);
  next();
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const data = await contacts.getContactById(id);
  errorChecker.is404(data, res, data);
  next();
});

router.post("/", async (req, res, next) => {
  const { body } = req;
  if (!body || !body.name || !body.email || !body.phone) {
    res.status(400);
    res.json({ status: 400, message: "missing required name field" });
    return 0;
  }

  const validatedData = schema.validate(body);
  if (validatedData.error) {
    res.status(400);
    res.json({ status: 400, message: validatedData.error });
    return 0;
  }

  const data = await contacts.addContact(body);
  res.json({ status: 201, data });
  next();
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const data = await contacts.removeContact(id);
  errorChecker.is404(data, res, { message: "contact deleted" });
  next();
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  const validatedData = schema.validate(body);
  if (validatedData.error) {
    res.status(400);
    res.json({ status: 400, message: validatedData.error });
    return 0;
  }

  const data = await contacts.updateContact(id, body);
  errorChecker.is404(data, res, data);
  next();
});

module.exports = router;
