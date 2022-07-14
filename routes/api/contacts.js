const express = require("express");
const contacts = require("../../models/contacts");
const createError = require("../../helpers/createError");
const Joi = require("joi");
const contactsScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contactsData = await contacts.listContacts();
    res.json(contactsData);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contactsData = await contacts.getContactById(id);
    if (contactsData) res.json(contactsData);
    else next();
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    const { error } = contactsScheme.validate(body);

    if (error) throw createError(400, error.message);
    const addedContact = await contacts.addContact(body);
    if (!addedContact) throw createError(400, "Contact is already in the list");
    res.status(201).json(addedContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const removedContact = await contacts.removeContact(id);
    if (removedContact) res.json({ message: "Successfully deleted" });
    else next();
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const { body } = req;
    const { error } = contactsScheme.validate(body);
    if (error) throw createError(400, error.message);
    const updatedContact = await contacts.updateContact(id, body);
    if (!updatedContact) {
      next();
      return;
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
