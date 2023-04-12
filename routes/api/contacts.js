const express = require("express");
// express для маршрутизації
const router = express.Router();
// створюємо сторінку записної книжки
const { HttpError } = require("../../helpers");
const Joi = require("joi");
// для валідації при додавані до json
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.base": "'email' should be a type of string",
      "string.email": "field 'email' must be a valid email",
      "any.required": "missing required field 'email'",
    }),
  phone: Joi.string()
    .pattern(/^\(\d{3}\)\d{2}-\d{2}-\d{3}$/)
    .trim()
    .required()
    .messages({
      "string.base": "'phone' should be a type of string",
      "string.empty": "'phone' must contain value",
      "any.required": "missing required field 'phone'",
    }),
});

const putSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .messages({
      "string.base": "'email' should be a type of string",
      "string.email": "field 'email' must be a valid email",
      "any.required": "missing required field 'email'",
    }),
  phone: Joi.string()
    .pattern(/^\(\d{3}\)\d{2}-\d{2}-\d{3}$/)
    .trim()
    .messages({
      "string.base": "'phone' should be a type of string",
      "string.empty": "'phone' must contain value",
      "any.required": "missing required field 'phone'",
    }),
}).or("name", "email", "phone");

const contacts = require("../../models/contacts");

// отримання всіх контактів
router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});
// отримання 1 контакта по id
router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});
//добавлення контакта
router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(404, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});
//видалення контакта по id
router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json({ message: "Delete success contact", result });
  } catch (error) {
    next(error);
  }
});
//зміна чогось в контакті по id
router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = putSchema.validate(req.body);
    if (error) {
      throw HttpError(404, error.message);
    }

    const id = req.params.contactId;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
