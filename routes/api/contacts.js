const express = require('express');
const Joi = require('joi');

const { HttpError } = require('../../helpers');

const contactsService = require('../../models/contacts')

const router = express.Router()

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" must be exist`
  }),
  phone: Joi.string().required(),
  email: Joi.string().required(),

})

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    console.log('result', result);
    if (!result) {
      throw HttpError(404, "Contact with id=${contactId} not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  }
  catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Contact with id=${contactId} not found");
    }
  } catch (error) {
    next(error);
  }
  res.status(200).json({
    message: "Contact deleted"
  });
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contactsService.updateContactById(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Contact with id=${contactId} not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
})

module.exports = router
