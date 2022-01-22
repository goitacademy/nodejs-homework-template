const express = require("express");
const createError = require("http-errors");
const Joi = require("joi");

const contacts = require("../../models/contacts");

const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().min(5).max(30).required(),
  phone: Joi.string().min(3).max(30).required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw createError(404, `Contact with id '${id}' not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, {
        message: `Missing required field: ${error.message}`,
      });
    }
    const { name, email, phone } = req.body;
    const result = await contacts.addContact(name, email, phone);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, (error.message = "Missing fields"));
    }
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const result = await contacts.updateContact(id, name, email, phone);
    if (!result) {
      throw createError(404, `Contact with id '${id}' not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw createError(404, `Contact with id '${id}' not found`);
    }
    res.json({ message: "Contact deleted", deletedContact: result });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
