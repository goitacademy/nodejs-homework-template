const express = require("express");
const router = express.Router();
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({ contacts });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  try {
    const contact = await getContactById(contactId);
    res.status(200).json({ contact });
  } catch (error) {
    res.status(404).json({ message: "Contact not found" });
  }
});

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.post("/", async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const newContact = await addContact(req.body);
    res.status(201).json({ message: "Added new contact", contact: newContact });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  try {
    await removeContact(contactId);
    res.status(200).json({ message: `Deleted contact: ${contactId}` });
  } catch (error) {
    res.status(404).json({ message: "Contact not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const { name, email, phone } = req.body;
  const updatedContact = { name, email, phone };

  try {
    const contact = await updateContact(contactId, updatedContact);
    if (contact) {
      res.status(200).json({
        message: `Updated contact: ${contactId}`,
        contact,
      });
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
