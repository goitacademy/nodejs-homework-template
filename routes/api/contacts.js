const express = require("express");
const contactsOperations = require("../../models/contacts");
const Joi = require("joi");

const contactSchemaAdd = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/)
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/\(\d{3,3}\)[\s]\d{3,3}[-]\d{4,4}/)
    .required(),
});

const contactSchemaUpd = Joi.object({
  name: Joi.string().pattern(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/\(\d{3,3}\)[\s]\d{3,3}[-]\d{4,4}/),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(contactId);
    if (!contact) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchemaAdd.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing required name field";
      throw error;
    }
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { name = null, email = null, phone = null } = req.body;
    const { error } = contactSchemaUpd.validate(req.body);
    if ((!name && !email && !phone) || error) {
      const error = new Error("missing fields");
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const updContact = await contactsOperations.updateContact(contactId, req.body);
    if (!updContact) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json(updContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
