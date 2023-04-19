const express = require('express');
const { HttpError } = require('../../helpers');
const contactsService = require('../../models/contacts');
const Joi = require('joi');

const router = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({ 'any.required': `"name" must be exist` }),
  email: Joi.string().required().messages({ 'any.required': `"email" must be exist` }),
  phone: Joi.string().required().messages({ 'any.required': `"phone" must be exist` }),
});

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw HttpError(404, `Contact with ${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
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

router.put('/:id', async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { id } = req.params;
    const result = await contactsService.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, `Contact with id: ${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) {
      throw HttpError(404, `Contact with ${id} not found`);
    }
    // res.json(result);
    // res.status(204).send();
    res.json({
      message: `Contact with id: ${id} delete sucess`,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
