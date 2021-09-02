const express = require("express");

const validationSchema = require("../../../validation");

const contactsOperations = require("../../../model");

const router = express.Router();

router.get("/", async (_, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      contacts,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contacts = await contactsOperations.getContactById(contactId);
    if (!contacts) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.json({
      contacts,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const isValid = await validationSchema.isValid(req.body);
    if (!isValid) {
      return res.status(400).json({ message: "missing required name field" });
    }
    const newContacts = await contactsOperations.addContact(req.body);
    res.status(201).json({ newContacts });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.removeContact(contactId);
    if (!contact) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.json({
      contact,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const body = req.body;
    const isValid = await validationSchema.isValid(body);
    if (!isValid) {
      return res.status(400).json({ message: "missing required name field" });
    }
    const { id } = req.params;
    const newContact = await contactsOperations.updateContact(id, body);
    if (!newContact) {
      return res.status(400).json({ message: "missing fields" });
    }
    res.json({ newContact });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
