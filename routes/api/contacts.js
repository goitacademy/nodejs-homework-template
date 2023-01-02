const express = require("express");

const Joi = require("joi");
const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const contacts = require("../../models/contacts");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contactsAll = await contacts.listContacts();
    res.status(200).json(contactsAll);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);
    if (!contact) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.status(200).json(contactById);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const contact = await contacts.addContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.updateContact(contactId);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const contact = await contacts.removeContact(contactId, req.body);
    if (!contact) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
