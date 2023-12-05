const express = require("express");

const router = express.Router();

const Joi = require("joi");

const contactsFunc = require("../../models/contacts");

const { HttpError } = require("../../helpers");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  const contacts = await contactsFunc.listContacts();
  try {
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsFunc.getContactById(contactId);
  try {
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const newContact = await contactsFunc.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removedContact = await contactsFunc.removeContact(contactId);
    if (!removedContact) {
      throw HttpError(400, "Not found");
    }
    res.status(200).json(removedContact);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const editContact = await contactsFunc.updateContact(contactId, req.body);
    if (!editContact) {
      throw HttpError(404, "Not found");
    }
    res.json(editContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
