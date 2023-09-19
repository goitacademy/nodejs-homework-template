const express = require("express");

const router = express.Router();
const contacts = require("./../../models/contacts");
const schema = require("../../utilits/validation");
const errorHandler = require('../../utilits/errorHandler')


router.get("/", async (req, res, next) => {
  const contactsList = await contacts.listContacts();
  res.status(200).json(contactsList);
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await contacts.getContactById(req.params.contactId);
    errorHandler(!contact, 404, "Not found");
    res.status(200).json(contact);
  } catch (error) {
    res.status(error.status).json({
      message: error.message,
    });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = schema.postSchema.validate(req.body);
    errorHandler(error, 400, "missing required name field");
    const contact = await contacts.addContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await contacts.removeContact(req.params.contactId);
    errorHandler(!contact, 404, "Not found");
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = schema.putSchema.validate(req.body);
    errorHandler(error, 400, "missing fields");
    const contact = await contacts.updateContact(
      req.params.contactId,
      req.body
    );
    errorHandler(!contact, 404, "Not found");
    res.status(200).json(contact);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
});

module.exports = router;
