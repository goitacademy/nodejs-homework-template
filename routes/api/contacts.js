const express = require("express");
const Joi = require("joi");
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
  res.status(200).json({ contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const [contact] = await getContactById(req.params.contactId);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ contact });
});

router.post("/", async (req, res, next) => {
  const newContact = await addContact(req.body);
  if (
    req.body.name === undefined ||
    req.body.phone === undefined ||
    req.body.email === undefined
  ) {
    res.status(400).json({ message: "missing required field" });
  }
  res.status(201).json({ newContact });
});

router.delete("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (contact.length === 0) {
    res.status(404).json({ message: "Not found" });
  }
  await removeContact(req.params.contactId);
  res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const updContact = await updateContact(req.params.contactId, req.body);
  if (
    req.body.name === undefined ||
    req.body.phone === undefined ||
    req.body.email === undefined
  ) {
    res.status(400).json({ message: "missing fields" });
  }
  res.status(200).json({ updContact });
});

module.exports = router;
