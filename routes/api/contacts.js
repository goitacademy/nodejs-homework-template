const express = require("express");
const contacts = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await contacts.listContacts();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({message: "Server error"})
  }
  
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const data = await contacts.getContactById(contactId);
  res.status(200).json(data);
});

router.post("/", async (req, res, next) => {
  const data = await contacts.addContact(req.body);
  res.status(201).json(data);
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const data = await contacts.removeContact(contactId);
  res.status(200).json(data);
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const data = await contacts.updateContact(contactId, req.body);
  res.status(200).json(data);
});

module.exports = router;
