const express = require("express");

const router = express.Router();
const contactsOperations = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const list = await contactsOperations.listContacts();
  res.status(200).json({
    // message: "template message",
    result: list,
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsOperations.getContactById(contactId);
  if (!contact) {
    res.status(404).json({
      message: "Not found",
    });
  } else {
    res.status(200).json({
      result: contact,
    });
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    const newContact = await contactsOperations.addContact(req.body);
    res.status(200).json({
      result: newContact,
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const removedContact = await contactsOperations.removeContact(contactId);
  if (!removedContact) {
    res.status(404).json({
      message: "Not found",
    });
  } else {
    res.status(200).json({
      message: "contact deleted",
    });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  console.log(req.body);
  if (!name || !email || !phone) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    const contact = await contactsOperations.updateContact(contactId, req.body);
    res.status(200).json({
      result: contact,
    });
  }
});

module.exports = router;
