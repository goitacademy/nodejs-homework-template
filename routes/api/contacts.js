const express = require("express");

const contact = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const result = await contact.listContacts();
  res.json(result);
});

router.get("/:contactId", async (req, res, next) => {
  const result = await contact.getContactById(req.params.contactId);
  res.json(result);
});

router.post("/", async (req, res, next) => {
  const result = await contact.addContact(req.body);
  res.json(result);
});

router.delete("/:contactId", async (req, res, next) => {
  const result = await contact.removeContact(req.params.contactId);
  res.json(result);
});

router.put("/:contactId", async (req, res, next) => {
  const result = await contact.updateContact(req.params.contactId, req.body);
  res.json(result);
});

module.exports = router;
