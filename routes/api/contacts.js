const express = require("express");
const router = express.Router();

const { contactValidation } = require("../../validator");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const response = await listContacts();
  res.status(200).json(response);
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
});

router.post("/", contactValidation, async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name) {
    return res.status(400).json({ message: "missing required name field" });
  } else if (!email) {
    return res.status(400).json({ message: "missing required email field" });
  } else if (!phone) {
    return res.status(400).json({ message: "missing required phone field" });
  }
  const contact = { name, email, phone };
  await addContact(contact);
  res.status(201).json(contact);
});

router.delete("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
  }
  await removeContact(req.params.contactId);
  res.status(200).json(contact);
});

router.put("/:contactId", contactValidation, async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
  }
  await updateContact(id, req.body);
  const updatedContact = await getContactById(id);
  res.status(200).json(updatedContact);
});

module.exports = router;
