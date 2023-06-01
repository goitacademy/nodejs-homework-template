const express = require("express");
const Joi = require("joi");

const contactsControl = require("../../models/contacts");

const router = express.Router();

const { HttpError } = require("../../helpers");

const contactsScheme = Joi.object({
  name: Joi.string().required().messages({
    "string.base": `"name" should be a type of 'text'`,
    "string.empty": `"name" cannot be an empty field`,
    "any.required": `"name" is a required field`,
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .messages({
      "string.empty": `"email" cannot be an empty field`,
      "any.required": `"email" is a required field`,
    })
    .required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.pattern.base": `Phone number must have 10 digits.`,
      "string.empty": `"phone" cannot be an empty field`,
      "any.required": `"phone" is a required field`,
    }),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsControl.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsControl.getContactById(id);
    if (!result) {
      throw HttpError(404, `Contact with id ${id} was not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsScheme.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsControl.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsControl.removeContact(id);
    if (!result) {
      throw HttpError(404, `Contact with id ${id} was not found.`);
    }
    res.status(200).json({ message: "Contact was successfully deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = contactsScheme.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await contactsControl.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, `Contact with id ${id} was not found.`);
    }
    console.log(result);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
