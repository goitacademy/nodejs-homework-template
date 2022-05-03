const express = require("express");

const {
  addContactValid,
  validatePatch,
} = require("../../middlewares/validator");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  if (!contacts) {
    return res.status(400).json({ message: "contacts not found" });
  }
  res.status(200).json({ contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  if (!contact.length) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ contact });
});

router.post("/", addContactValid, addContact);

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const delContact = await removeContact(id);
  console.log('delContact', delContact)
  if (!delContact.length) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "Contact deleted" });
});

router.put("/:contactId", validatePatch, updateContact);

module.exports = router;
