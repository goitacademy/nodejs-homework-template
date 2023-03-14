const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts.js");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();

  res.json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);

  res.json(contact);
});

router.post("/", async (req, res, next) => {
  const contact = await addContact(req.body);

  res.status(201).json(contact);
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await removeContact(id);

  res.status(200).json(contact);
});

router.put("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await updateContact(id, req.body);

  res.status(200).json(contact);
});

module.exports = router;
