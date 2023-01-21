const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");
const { contactValidation } = require("../../schemas/validation");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({ message: "success", code: 200, contacts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json({ message: "success", contact });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", contactValidation, async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400).json({ message: "missing required name field" });
      return;
    }
    const contact = await addContact(name, email, phone);
    res.status(201).json({ message: "contact added", contact });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const isContactDeleted = await removeContact(contactId);
    if (!isContactDeleted) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:contactId", contactValidation, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: "missing field" });
      return;
    }

    const updatedContact = await updateContact(contactId, req.body);

    if (!updatedContact) {
      res.status(400).json({ message: "Not found" });
      return;
    }
    res.status(200).json({ message: "success", contact: updatedContact });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
