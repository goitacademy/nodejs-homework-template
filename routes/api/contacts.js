const express = require("express");
const router = express.Router();
const Joi = require("joi");
const contacts = require("../../models/contacts");

const {HttpError} = require("../../helpers");

const addSchema = Joi.object({
    name: Joi.string().required().messages({
      "any.required": `missing required name field`,
      "string.empty": `"name" cannot be empty`,
      "string.base": `"name" must be string`
    }),
    email: Joi.string().email().required().messages({
      "any.required": `missing required name field`,
      "string.empty": `"email" cannot be empty`,
      "string.base": `"email" must be string`
    }),
    phone: Joi.string().pattern(/^[0-9+() -]+$/).required().messages({
        "any.required": `missing required name field`,
        "string.empty": `"phone" cannot be empty`,
        "string.base": `"phone" must be string`
    }),
})


router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.status(200).json(result);
  }
  catch(error) {
      next(error);
}
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if(!result) {
      throw HttpError(404, `Not found`);
    }
    res.status(200).json(result);
  }
  catch(error) {
    next(error);
  }
})


router.post('/', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if(error) {
      throw HttpError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  }
  catch(error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await contacts.removeContact(contactId);
    if(!result) {
      throw HttpError(404, `Not found`);
    }
    res.status(200).json(
      {message: "contact deleted"}
    )
    
  }
  catch(error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if(error) {
      throw HttpError(400, error.message);
    }
    const {contactId} = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if(!result) {
      throw HttpError(404, `Not found`);
    }
    res.status(200).json(result);
  }
  catch(error) {
    next(error);
  }
})

module.exports = router
