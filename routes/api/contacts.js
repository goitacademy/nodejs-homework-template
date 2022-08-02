const express = require("express");
const Joi = require("joi");

const contacts = require("../../models/contacts");
const { createError } = require("../../helpers");

const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const data = await contacts.listContacts();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await contacts.getContactById(contactId);
    if (!data) {
      throw createError(404);
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const data = await contacts.addContact(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await contacts.removeContact(contactId);
    if (!data) {
      throw createError(404);
    }
    res.json({ message: "Book deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { contactId } = req.params;
    const data = await contacts.updateContact(contactId, req.body);
    if (!data) {
      throw createError(404);
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
