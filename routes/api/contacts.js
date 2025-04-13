const express = require("express");
const router = express.Router();
const contacts = require("../../models/contacts");
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\d+$/).required(),
});

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    res.status(200).json(allContacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: `Validation error: ${error.details[0].message}` });
    }

    const newContact = await contacts.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: `Validation error: ${error.details[0].message}` });
    }

    const { contactId } = req.params;
    const updatedContact = await contacts.updateContact(contactId, req.body);
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
