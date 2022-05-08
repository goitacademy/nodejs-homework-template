const express = require("express");

const router = express.Router();

const Joi = require("joi");
const contacts = require("../../models/contacts");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().required(),
});

const createError = require("../../helpers/createErr");

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const contactId = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newContact = req.body;
    const { error } = schema.validate(newContact);
    if (error) {
      throw createError(400, "missing required name field");
    }
    const result = await contacts.addContact(newContact);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// {name: "test", email:"karpeko@mail.com", phone: 1244121}

router.patch("/:id", async (req, res, next) => {
  try {
    const contactData = req.body;
    const contactId = req.params;
    const result = await contacts.updateContact(contactId, contactData);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const contactId = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw createError(404);
    }
    res.json({ message: "contact deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
