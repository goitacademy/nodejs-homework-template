const express = require("express");
const contacts = require("../../models/contacts");
const router = express.Router();
const { contactSchema } = require("../../Shema/shema");
//======================getAll==========================
router.get("/", async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    console.log(allContacts);
    res.status(200).json(allContacts);
  } catch (error) {
    res.status(404).json({
      message: "Not found",
    });
  }
});
//========================getID========================
router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);
    res.status(200).json(contact);
    console.log(contact);
  } catch (error) {
    res.status(404).json({
      message: "Not found",
    });
  }
});
//=======================post=========================
router.post("/", async (req, res, next) => {
  const { error, value } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "it is error" });
  }
  const newContact = await contacts.addContact(req.body);
  console.log(newContact);
  res.status(201).json(newContact);
});
//=======================delete=========================
router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const func = await contacts.removeContact(contactId);
    if (func) {
      res.status(200).json({ message: "contact deleted" });
    }
  } catch (error) {
    res.status(404).json({ message: "not found" });
  }
});
//========================put========================
router.put("/:contactId", async (req, res, next) => {
  try {
    const { error, value } = contactSchema.validate(req.body);
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: "not found" });
  }
});

module.exports = router;
