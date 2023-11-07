const express = require("express");
const Joi = require("joi");
const contacts = require("../../models/contacts");
// const contactSchema = require("../../schemas/contacts");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
    console.log(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const result = await contacts.getContactById(req.params.contactId);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  await contacts.removeContact(req.params.contactId);
  res.json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const updatedContact = await contacts.updateContact(
      req.params.contactId,
      req.body
    );
    console.log(updatedContact);
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
