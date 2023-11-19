const express = require("express");
const contactsServices = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await contactsServices.listContacts();
  res.json({ message: "message", data: { contacts } });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsServices.getContactById(contactId);
  res.json({ message: " message", data: { contact } });
});

router.post("/", async (req, res, next) => {
  const contact = await contactsServices.addContact(req.body);
  res.json({ message: " message", data: { contact } });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  await contactsServices.removeContact(contactId);
  res.json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  await contactsServices.updateContact(contactId, req.body);
  res.json({ message: " message" });
});

module.exports = router;
