const express = require("express");
const router = express.Router();
const contactsOperations = require("../../models/contacts");
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(9).required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({ status: "success", code: 200, data: { contacts } });
  } catch (e) {
    next(e);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await contactsOperations.getContactById(
      req.params.contactId
    );
    if (contact) {
      res.json({ status: "success", code: 200, data: { contact } });
    } else {
      res.json({ status: "error", code: 404, message: "Not found" });
    }
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const value = await contactSchema.validateAsync(req.body);
    const newContact = await contactsOperations.addContact(value);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await contactsOperations.removeContact(
      req.params.contactId
    );
    if (contact) {
      res.json({ status: "success", code: 200, message: "contact deleted" });
    } else {
      res.json({ status: "error", code: 404, message: "Not found" });
    }
  } catch (e) {
    next(e);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const value = await contactSchema.validateAsync(req.body);
    const updatedContact = await contactsOperations.updateContact(
      req.params.contactId,
      value
    );
    if (updatedContact) {
      return res.json(updatedContact);
    }
    return res.status(404).json({ message: "Not found" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
