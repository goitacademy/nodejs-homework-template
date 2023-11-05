const express = require("express");
const crypto = require("crypto");

const router = express.Router();

const contactSchema = require("../../schemas/contacts");
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
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contact = await getContactById(contactId);
    if (!contact) {
      return next();
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const response = contactSchema.validate(req.body);

  if (typeof response.error !== "undefined") {
    return res.status(400).json({ message: "missing required name field" });
  }
  const { name, email, phone } = response.value;
  const newContact = { name, email, phone, id: crypto.randomUUID() };
  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contact = await removeContact(contactId);
    if (!contact) {
      return next();
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  const response = contactSchema.validate(req.body);

  if (typeof response.error !== "undefined") {
    return res.status(400).json({ message: "missing fields" });
  }

  const contactId = req.params.contactId;
  const updatedContact = await updateContact(contactId, response.value);
  if (!updatedContact) {
    return next();
  }

  res.status(200).json({ updatedContact });
});

module.exports = router;
