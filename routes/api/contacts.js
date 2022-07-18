const express = require('express')
const Joi = require('joi');

const { contactActions } = require('../../models/contacts');
const createError = require('../../helpers/createError');

const contactAddTemplate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

const router = express.Router()

router.get('/', async (_, res, next) => {
  try {
    const result = await contactActions.listContacts();
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactActions.getContactsById(contactId);
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactAddTemplate.validate(req.body);
    if (error) {
      throw createError(400);
    }
    const result = await contactActions.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactActions.deleteContactById(contactId);
    if (!result) {
      throw createError(404)
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactAddTemplate.validate(req.body);
    if (error) {
      throw createError(400);
    }
    const { contactId } = req.params;
    console.log("router put: req.body\n", req.body);
    console.log("router put: contactId", contactId);

    const result = await contactActions.updateContact(contactId, req.body);
    console.log("router put: result", result);

    if (!result) {
      throw createError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
})

module.exports = router
