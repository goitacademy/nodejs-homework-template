const express = require('express');
const Joi = require("joi");

const operations = require("../../models/contacts");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const { RequestError } = require('../../helpers');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const contacts = await operations.listContacts();
    res.json(contacts);
    console.log('req:', req.body);
  }
  catch (err) {
    next(err);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await operations.getContactById(req.params.contactId);
    if (!contact) {
      throw RequestError(404, 'Not found');
    }
    res.json(contact);
  }
  catch (err) {
    next(err);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    console.log(req.body);
    if (error) {
      throw RequestError(400, error.message)
    }
    const contact = await operations.addContact(req.body);
    res.status(201).json(contact);
  } catch (err) {
    next(err);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await operations.removeContact(contactId);
    if (!contact) {
      throw RequestError(404, 'Not found');
    }
    res.json({
      message: 'Contact removed successfully!'
    });
  }
  catch (err) {
    next(err);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message)
    }
    const { contactId: id } = req.params;
    const contact = await operations.updateById(id, req.body);
    if (!contact) {
      throw RequestError(404, 'Not found');
    }
    res.status(201).json(contact);
  } catch (err) {
    next(err);
  }
})

module.exports = router
