const express = require("express");
const contacts = require("../../models/contacts");
const router = express.Router();
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().required(),
});
router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);
    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const value = await schema.validateAsync({ name, email, phone });
    const contact = await contacts.addContact(value);
    res.status(201).json(contact);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);
    if (!contact) {
      next(new Error("Not found"));
    }
    const deletedContact = await contacts.removeContact(contactId);
    res.status(200).json({ message: "Contact deleted", deletedContact });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const value = await schema.validateAsync({ name, email, phone });
    const updatedContact = await contacts.updateContact(contactId, value);
    res.status(200).json({ message: "Contact updated", updatedContact });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
