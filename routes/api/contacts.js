const contactsModel = require("../../models/contacts");
const contactsUtils = require("../../utils/contacts");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.json(await contactsModel.listContacts());
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await contactsModel.getContactById(req.params.contactId);
    if (contact) {
      res.json(contact);
      return;
    }
    res.status(404).json({ message: "Not found" });
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const contact = { name: req.body.name, email: req.body.email, phone: req.body.phone };
    const validationResult = contactsUtils.validateContact(contact);
    if (validationResult.error === undefined) {
      const addedContact = await contactsModel.addContact(contact);
      res.status(201).json(addedContact);
      return;
    }
    res.status(400).json({ message: validationResult.error });
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const removed = await contactsModel.removeContact(req.params.contactId);
    if (removed) {
      res.json({ message: "contact deleted" });
      return;
    }
    res.status(404).json({ message: "Not found" });
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const contact = { name: req.body.name, email: req.body.email, phone: req.body.phone };
    const validationResult = contactsUtils.validateContact(contact);
    if (validationResult.error === undefined) {
      const updatedContact = await contactsModel.updateContact(req.params.contactId, contact);
      if (updatedContact) {
        res.status(200).json(updatedContact);
        return;
      }
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(400).json({ message: validationResult.error });
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

module.exports = router;
