const express = require("express");
const Joi = require("joi");

const router = express.Router();

const contacts = require("../../models/contacts");
const createError = require("../../helpers/createError");

const contactsSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const result = await contacts.getContactById(req.params.id);
    if (!result) {
      return next(createError("Contact not found", 404));
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw createError(error.message, 400);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await contacts.removeContact(req.params.id);
    if (!result) {
      throw createError("Contact not found", 404);
    }
    res.status(204);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw createError(error.message, 400);
    }
    const result = await contacts.updateContact(req.params.id, req.body);
    if (!result) {
      throw createError("Contact not found", 404);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;