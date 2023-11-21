const express = require("express");

const router = express.Router();

const contacts = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const allContacts = await contacts.listContacts();
  res.json({ status: "success", code: 200, data: { allContacts } });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await contacts.getContactById(contactId);
  res.json({ status: "success", code: 200, data: { contactById } });
});

router.post("/", async (req, res, next) => {
  const newContact = await contacts.addContact(req.body);
  res.json({ status: "success", code: 201, data: { newContact } });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  const removedContact = await contacts.removeContact(contactId);
  if (!removedContact) {
    res.json({ message: "Contact not found" });
  }

  res.json({
    status: "success",
    message: "Contact was deleted successfully",
    removedContact,
  });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
