const express = require("express");

const router = express.Router();

const { addValidation } = require("../../middlewares/validationMiddleware");

const contacts = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const contactsList = await contacts.listContacts();
  res.status(200).json(contactsList);
  next();
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await contacts.getContactById(contactId);
  if (!contactById) {
    res.status(404).json({ message: "contact not found" });
  } else {
    res.status(200).json(contactById);
  }
  next();
});

router.post("/", addValidation, async (req, res, next) => {
  const { name, email, phone } = req.body;
  const newContact = await contacts.addContact({ name, email, phone });
  res.status(201).json(newContact);
  next();
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const deletedById = await contacts.removeContact(contactId);
  if (!deletedById) {
    res.status(404).json({ message: "contact not found" });
  } else {
    res.status(200).json({
      message: "contact deleted succesfully",
    });
  }
  next();
});

router.put("/:contactId", addValidation, async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const updatedContact = await contacts.updateContact(contactId, {
    name,
    email,
    phone,
  });
  if (!updatedContact) {
    res.status(404).json({ message: "contact not found" });
  } else {
    res.status(200).json(updatedContact);
  }
  next();
});

module.exports = router;
