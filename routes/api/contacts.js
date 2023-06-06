const express = require("express");
const isEmpty = require("lodash.isempty");

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

  res.json({ data: contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) res.status(404).json({ message: "Not found" });

  res.json({ data: { ...contact } });
});

router.post("/", async (req, res, next) => {
  const { body } = req;
  const contact = await addContact(body);
  res.status(201).json({ data: { ...contact } });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);

  if (!result) res.status(404).json({ message: "Not found" });
  res.json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const { body } = req;
  const { contactId } = req.params;

  if (isEmpty(body)) res.status(400).json({ message: "missing fields" });

  const result = await updateContact(contactId, body);

  if (!result) res.status(404).json({ message: "Not found" });

  res.json({ data: { ...result } });
});

module.exports = router;
