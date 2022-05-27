const express = require("express");
const Joi = require("joi");
const contacts = require("../../models/contacts.js");
const errorHandler = require("../../errorHandler");
const router = express.Router();

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().min(3).max(30).required(),
});

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    res.json(allContacts);
  } catch (error) {
    res.statusCode(500, error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contacts.getContactById(id);
    if (!contact) {
      errorHandler(404, "Not Found");
    }
    res.json(contact);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);

    if (error) {
      errorHandler(400, `${error.message}`);
    }
    const { name, email, phone } = req.body;

    const contact = await contacts.addContact(name, email, phone);
    res.status(201).json(contact);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contacts.removeContact(id);

    if (!contact) {
      errorHandler(404, "Not found");
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);

    if (error) {
      errorHandler(400, `${error.message}`);
    }

    const { name, email, phone } = req.body;
    const { id } = req.params;
    const contact = await contacts.updateContact(id, name, email, phone);

    if (!contact) {
      errorHandler(404, "Not found");
    }

    res.json(contact);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
