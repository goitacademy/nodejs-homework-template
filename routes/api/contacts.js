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
    console.log(error);
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
  res.json({ message: "template message" });
});
//=======================post=========================
router.post("/", async (req, res, next) => {
  const { error, value } = contactSchema.validate(req.body);
  if (error) {
    // Отправка ошибки в случае невалидных данных
    return res.status(400).json({ message: "it is error" });
  }
  console.log("it works");
  const newContact = await contacts.addContact(req.body);
  res.status(200).json(newContact);
});
//=======================delete=========================
router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const func = await contacts.removeContact(contactId);
    if (func) {
      res.json({ message: "contact is removed" });
    }
  } catch (error) {
    console.log(error);
  }
});
//========================put========================
router.put("/:contactId", async (req, res, next) => {
  const { error, value } = contactSchema.validate(req.body);
  if (error) {
    // Отправка ошибки в случае невалидных данных
    return res.status(400).json({ message: "it is error" });
  }
  try {
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    res.json(result);
    console.log("it works");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
