const express = require("express");
const router = express.Router();

const contacts = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const allContacts = await contactsActions.listContacts();
  res.json(allContacts);
});

router.get("/:contactId", async (req, res, next) => {
  const oneContact = await contactsActions.getContactById(id);
  res.json(oneContact);
});

router.post("/", async (req, res, next) => {
  const addedContact = await contactsActions.addContact({ name, email, phone });
  res.json(addedContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const deletedContact = await contactsActions.removeContact(id);
  res.json(deletedContact);
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
