const express = require("express");
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
  res.json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  res.json(contact);
});

router.post("/", async (req, res, next) => {
  const addedContact = await addContact(req.body);

  res.json(addedContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const removedContact = await removeContact(req.params.contactId);
  res.json(removedContact);
});

router.put("/:contactId", async (req, res, next) => {
  const updatedContact = await updateContact(req.params.contactId, req.body);
  res.json(updatedContact);
});

module.exports = router;
