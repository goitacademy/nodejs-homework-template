const express = require("express");
const contacts = require("../../models/contacts");
const { postSchema, putSchema } = require("../../validation/validation");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const listContacts = await contacts.listContacts();
    if (listContacts.length < 1) {
      return res.json({ message: "There is no contacts" });
    }
    res.json({ listContacts });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);
    if (!contact) {
      return res
        .status(400)
        .json({ message: `Contact with id ${contactId} not found` });
    }
    res.json({ contact });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  console.log(req.body);
  const validationResult = postSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: validationResult.error.details });
  }
  next();
});

router.post("/", async (req, res, next) => {
  try {
    const addContact = await contacts.addContact(req.body);
    res.status(201).json({ addContact });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removeContact = await contacts.removeContact(contactId);
    if (!removeContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  const validationResult = putSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: validationResult.error.details });
  }
  next();
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updateContact = await contacts.updateContact(contactId, req.body);
    if (!updateContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ updateContact });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
