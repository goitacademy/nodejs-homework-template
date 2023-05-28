const express = require("express");
const Joi = require("joi");
const { HttpError } = require("../../helpers");

const router = express.Router();

const contacts = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contactsList = await contacts.listContacts();
    res.json(contactsList);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await contacts.getContactById(req.params.contactId);
    if (!contact) {
      throw HttpError(404);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const contact = await contacts.addContact(req.body);
  res.json(contact);
});

router.delete("/:contactId", async (req, res, next) => {
  const contact = await contacts.removeContact(req.params.contactId);
  res.json(contact);
});

router.put("/:contactId", async (req, res, next) => {
  const contact = await contacts.updateContact(req.params.contactId, req.body);
  res.json(contact);
});

module.exports = router;
