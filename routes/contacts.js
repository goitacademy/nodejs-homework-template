const express = require("express");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../controllers/contacts");
const { contactSchema } = require("../models/contacts");

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const contacts = listContacts();
    res.status(200).json(contacts);
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

router.get("/:contactId", (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = getContactById(contactId);
    if (!contact) {
      return res.status(404).send("Contact not found");
    }
    res.status(200).json(contact);
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

router.post("/", (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const contact = addContact(req.body);
    return res.status(201).json(contact);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Something went wrong!");
  }
});

router.delete("/:contactId", (req, res) => {
  const contactId = req.params.contactId;
  try {
    const removed = removeContact(contactId);
    if (removed) {
      return res.status(200).send("Contact deleted");
    } else {
      return res.status(404).send("Contact not found");
    }
  } catch (err) {
    return res.status(500).send("Something went wrong");
  }
});

router.put("/:contactId", (req, res) => {
  const { contactId } = req.params;
  if (!contactId) {
    return res.status(400).send("Id is required to perform update");
  }
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const contact = getContactById(contactId);
  if (!contact) {
    return res.status(404).send("Contact not found");
  }
  try {
    updateContact(contactId, req.body);
    return res.status(200).send("Contact sucessfully updated!");
  } catch {
    return res.status(500).send("Something went wrong!");
  }
});

module.exports = router;
