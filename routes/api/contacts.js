const express = require('express');
const HttpError = require('../../helpers/HttpError');
const contacts = require("../../models/contacts")

const router = express.Router()

const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    "string.base": `"name" should be a type of string`,
    "string.empty": `"name" must contain value`,
    "any.required": `"name" is a required field`,
  }),
  email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
    "string.base": `"email" should be a type of string`,
    "string.empty": `"email" must contain value`,
    "any.required": `"email" is a required field`,
  }),
  phone: Joi.string()
    .trim()
    .regex(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/)
    .required()
    .messages({
      "string.base": `"phone" should be a type of string`,
      "string.empty": `"phone" must contain value`,
      "string.pattern.base": `"phone" must be 10 digit number`,
      "any.required": `"phone" is a required field`,
    }),
});

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
      next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const result = await contacts.getById(req.params.id);
    if (result === null) {
      throw HttpError(404)
    } 
    res.status(200).json(result)
  } catch (error) {
      next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body)
    if (error) {
      throw HttpError(400, error.message)
    }
    const result = await contacts.addContact(req.body)
    res.status(201).json(result);
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await contacts.removeContact(id);
    if(!result) {
      throw HttpError(404)
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, (message = "missing fields"));
    }
    const {id} = req.params
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result)
  } catch (error) {
    next(error);
  }
})

module.exports = router
