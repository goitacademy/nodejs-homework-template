const express = require("express");

const router = express.Router();
const contacts = require("../../models/contacts.js");

router.get("/", async (req, res, next) => {
  // res.json({ message: "template message get" });

  try {
    const contactsList = await contacts.listContacts();
    res.status(200).json(contactsList);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  // res.json({ message: "template message" });
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
  // res.json({ message: "template message" });
  try {
    const body = req.body;
    const newContact = await contacts.addContact(body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  // res.json({ message: "template message" });
  try {
    const deleteContact = await contacts.removeContact(id);
    res.json(deleteContact);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  // res.json({ message: "template message" });
  try {
    const updContact = await contacts.addContact({ name, email, phone });
    res.json(updContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
