const express = require("express");
const contactsAPI = require("../../models/contacts");
const Joi = require("joi");

const contactsRouter = express.Router();

const contactValid = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

contactsRouter.get("/", async (req, res, next) => {
  const contactsList = await contactsAPI.listContacts();
  res.json(contactsList);
});

contactsRouter.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await contactsAPI.getContactById(id);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

contactsRouter.post("/", async (req, res, next) => {
  try {
    const { error } = contactValid.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const newContact = await contactsAPI.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await contactsAPI.removeContact(id);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = req.body;
    const { error } = contactValid.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const updatedContact = await contactsAPI.updateContact(id, contact);
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = contactsRouter;
