const express = require("express");
const { addDataSchema, updateDataSchema } = require("../../validation");
const contacts = require("../../models/contacts");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contactList = await contacts.listContacts();
    res.status(200).json({ contactList });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactId = await contacts.getContactById(req.params.contactId);
    if (!contactId) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ contactId });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const validationResult = addDataSchema.validate(req.body);
    if (validationResult.error) {
      console.log(validationResult.error.message);
      return res.status(400).json({ message: "missing required name - field" });
    }
    const postContact = await contacts.addContact(req.body);
    res.status(201).json({ postContact });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contacId = await contacts.removeContact(req.params.contactId);
    if (!contacId) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ contacId, message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const validationResult = updateDataSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: "missing fields" });
    }
    const contactId = req.params.contactId;
    const changes = await contacts.updateContact(contactId, req.body);
    res.status(200).json({ changes });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
