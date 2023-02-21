const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const { isContactValid } = require("../../validator/validator.js");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  console.log("GET /", contacts);
  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Contact was not found" });
  }
});

router.post("/", async (req, res, next) => {
  const { error } = isContactValid(req.body);
  if (error) {
    res.status(400).json({ message: "Missing required name field" });
  }
  const newContact = await addContact(req.body);
  if (newContact) {
    res.status(201).json(newContact);
  } else {
    res.status(400).json({ message: "Contact is already added." });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const updateContacts = await removeContact(contactId);
  if (updateContacts) {
    res.status(200).json({ message: "Contact deleted" });
  } else {
    res.status(404).json({ message: "Contact was not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { error } = isContactValid(req.body);
  if (error) {
    res.status(400).json({ message: "Missing fields." });
  }
  const { contactId } = req.params;
  const updatedContact = await updateContact(contactId, req.body);
  if (updateContact) {
    res.status(200).json(updatedContact);
  } else {
    res.status(404).json({ message: "Contact was not found" });
  }
});

module.exports = router;
