const express = require("express");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().min(8).max(99).required(),
});

const contactsOperations = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({ message: "Success", code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(contactId);
    if (contact.length === 0) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ message: "Success", code: 200, data: { contact } });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const contact = await contactsOperations.addContact(name, email, phone);
    res.status(201).json({ message: "Created", code: 201, data: { contact } });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.removeContact(contactId);
    if (contact.length === 0) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ message: "Deleted", code: 200, data: { contact } });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const contact = await contactsOperations.updateContact(
      contactId,
      name,
      email,
      phone
    );
    if (contact.length === 0) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ message: "Updated", code: 200, data: { contact } });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
