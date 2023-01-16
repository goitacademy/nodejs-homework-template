const express = require("express");
const { contactValidate } = require("./../../utils/validator.js");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  generateNewContact,
  getUpdatedContact,
  updateContact,
} = require("./../../models/contacts.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) return res.status(404).json({ message: "Not found" });
  if (contact) res.status(200).json(contact);
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { error } = contactValidate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  if (!name || !email || !phone)
    return res.status(400).json({ message: "missing required name field" });
  const newContact = await generateNewContact(req.body);
  await addContact(req.body);
  res.status(201).send(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) return res.status(404).json({ message: "Not found" });
  if (contact) {
    await removeContact(contactId);
    res.status(200).json({ message: "contact deleted" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { contactId } = req.params;
  const { error } = contactValidate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  if (!name && !email && !phone)
    return res.status(400).json({ message: "missing fields" });
  const contact = await getContactById(contactId);
  if (!contact) return res.status(404).json({ message: "Not found" });
  if (contact) {
    const updatedContact = await getUpdatedContact(contact, req.body);
    await updateContact(contactId, req.body);
    res.status(200).send(updatedContact);
  }
});

module.exports = router;
