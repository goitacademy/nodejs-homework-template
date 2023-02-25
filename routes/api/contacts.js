const express = require("express");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const {
  schemaPostContact,
  schemaPutContact,
} = require("../../validation/validation");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/", schemaPostContact, async (req, res, next) => {
  try {
    const contact = await addContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = removeContact(contactId);
    if (!data) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.put("/:contactId", schemaPutContact, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await getContactById(contactId);
    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }
    await updateContact(contactId, req.body);
    const updatedContact = await getContactById(contactId);
    res.status(200).json(updatedContact);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;
