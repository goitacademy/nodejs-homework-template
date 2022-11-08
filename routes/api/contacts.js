const express = require("express");

const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json({ ...contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const contactToFind = await getContactById(req.params.contactId);
  res.json({ ...contactToFind });
});

router.post("/", async (req, res, next) => {
  const newContact = await addContact(req.body);
  res.json({ ...newContact });
});

router.delete("/:contactId", async (req, res, next) => {
  const response = await removeContact(req.params.contactId);
  res.json({ ...response });
});

router.put("/:contactId", async (req, res, next) => {
  const response = await updateContact(req.params.contactId, req.body);
  res.json({ ...response });
});

module.exports = router;
