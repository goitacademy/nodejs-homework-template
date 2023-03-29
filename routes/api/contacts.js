const express = require("express");
const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");
const Joi = require("joi");

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" must be exist`,
    "string.base": `"name" must be string`,
    "string.empty": `"name" cannot be empty`,
  }),
  email: Joi.string().required().messages({
    "any.required": `"email" must be exist`,
    "string.base": `"email" must be string`,
    "string.empty": `"email" cannot be empty`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" must be exist`,
    "string.base": `"phone" must be string`,
    "string.empty": `"phone" cannot be empty`,
  }),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    console.log("req.params", req.params);
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) {
      throw HttpError(404, `Book with ${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log("req.body", req.body);

    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Book with ${contactId}} not found`);
    }
    // res.status(204).send()
    res.json({
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Book with ${contactId} not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
