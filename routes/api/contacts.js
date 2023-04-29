const express = require("express");
const Joi = require("joi");
const contactsService = require("../../models/contacts");
const { HttpError } = require("../../helpers");
const router = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": `"Name" is a required field ` }),
  email: Joi.string().required().messages({
    "any.required": `"Email" is a required field`,
    "string.email": "Email must be a valid email",
  }),
  phone: Joi.string()
    .required()
    .length(11)
    .pattern(/^[0-9]+$/)
    .messages({
      "any.required": `"Phone" is a required field`,
      "string.pattern.base": "Phone should include only digits",
      "string.length": "Phone length must be 11 characters long",
    }),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Contact not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contactsService.updateContactById(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Contact not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Contact not found");
    }
    res.json({
      message: "Contact deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
