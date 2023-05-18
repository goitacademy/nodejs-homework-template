const express = require('express')
const Joi = require('joi');
const { HttpError } = require('../../helpers');

const contactsMethods = require('../../models/contacts');

const contactSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': "missing required name field"
  }),
  email: Joi.string().email().required().messages({
    'any.required': "missing required name field",
    'any.invalid': 'invalid value'
  }),
  phone: Joi.string().required().messages({
    'any.required': "missing required name field"
  })
});



const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsMethods.listContacts();
    res.json(result)
  }
  catch (e) {
    next(e)
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsMethods.getContactById(contactId);
    if (!result) {
      throw HttpError(404, 'Requested contact not found');
    }
    res.json(result);
  }
  catch (e) {
    next(e)
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      throw HttpError(400, error.message)
    }
    const result = await contactsMethods.addContact(req.body);
    res.status(201).json(result)
  }
  catch (e) {
    next(e)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsMethods.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.json({
      message: "contact deleted"
    })
  }
  catch (e) {
    next(e)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, 'missing fields')
    }
    const { contactId } = req.params;
    const result = await contactsMethods.updateContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.json(result)
  }
  catch (e) {
    next(e)
  }
})

module.exports = router
