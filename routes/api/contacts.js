const express = require("express");
const { NotFound } = require("http-errors");
const router = express.Router();
const contacts = require("../../models/contacts.js");

router.get("/", async (req, res, next) => {
  try {
    const contactsList = await contacts.listContacts();
    res.status(200).json(contactsList);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const oneContact = await contacts.getContactById(id);
    if (!oneContact) {
      const message = new Error("Not found");
      message.status = 404;
      throw message;
    }
    res.status(200).json(oneContact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const newContact = await contacts.addContact(body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const deleteContact = await contacts.removeContact(id);
    if (!deleteContact) {
      throw new NotFound("Not found");
    }
    res.status(200).json({
      message: `Contact deleted`,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const body = req.body;
    const id = req.params.contactId;

    const updContact = await contacts.updateContact(id, body);
    if (!updContact) {
      throw new NotFound();
    }
    res.status(200).json(updContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
