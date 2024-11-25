const express = require("express");
const operations = require("../../models/contacts");
const { HttpError } = require("../../helpers");
const Joi = require("joi");

const contactsShema = Joi.object({
  name: Joi.string()
    .messages({
      "any.required": "missing required name field",
    })
    .required(),
  email: Joi.string()
    .messages({
      "any.required": "missing required email field",
    })
    .required(),
  phone: Joi.string()
    .max(14)
    .messages({
      "any.required": "missing required phone field",
    })
    .required(),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await operations.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await operations.getContactById(contactId);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsShema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await operations.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await operations.removeContact(contactId);
    if (!result) {
      throw HttpError(404);
    }
    res.status(201).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactsShema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing fields");
    }
    const { contactId } = req.params;
    const result = await operations.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
