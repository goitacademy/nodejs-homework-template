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
  const contacts = await listContacts();
  res.status(200).json({ message: "success", code: 200, contacts });
});

router.get("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json({ message: "success", contact });
});

router.post("/", async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400).json({ message: "missing required name field" });
    return;
  }
  const contact = await addContact(name, email, phone);
  res.status(201).json({ message: "contact added", contact });
});

router.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const contactDeleted = await removeContact(contactId);
  if (!contactDeleted) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await updateContact(contactId, req.body);
  if (Object.keys(req.body).length === 0) {
    req.status(400).json({ message: "missing fields" });
    return;
  }
  res.status(200).json({ message: "contact updated", contact: updatedContact });
});

module.exports = router;
