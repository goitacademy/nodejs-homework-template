const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res) => {
  const list = await listContacts();

  res.json(list);
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.json(contact);
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (name && email && phone) {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
    return;
  }

  res.status(400).json({ message: "missing required name field" });
});

router.put("/:contactId", async (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ message: "missing fields" });
  }
  const updatedContact = await updateContact(req.params.contactId, req.body);
  if (!updatedContact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json(updatedContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const status = await removeContact(req.params.contactId);
  if (!status) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json({ message: "contact deleted" });
});

module.exports = router;
