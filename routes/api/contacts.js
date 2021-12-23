const express = require('express');
const router = express.Router();
const CreateError = require('http-errors');
const Joi = require('joi');

const contactsOperations = require('../../model/index');

const joiAddSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const joiUpdSchema = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email(),
  phone: Joi.string(),
});

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsOperations.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const result = await contactsOperations.getContactById(id);
    if (!result) {
      throw new CreateError(404, 'Not found');
      // const error = new Error('Not found');
      // error.status = 404;
      // throw error;
    }
    res.json(result);
  } catch (error) {
    next(error);
    // const { status = 500, message = 'Server error' } = error;
    // res.status(status).json({ message });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = joiAddSchema.validate(req.body);
    if (error) {
      throw new CreateError(400, 'missing required name field');
    }
    const newContact = await contactsOperations.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const deletedContact = await contactsOperations.removeContact(id);
    if (!deletedContact) {
      throw new CreateError(404, 'Not found');
    }
    res.json(deletedContact);
  } catch (error) {
    next(error);
  }
});

router.patch('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const { error } = joiUpdSchema.validate(req.body);
    if (error) {
      throw new CreateError(400, 'missing required name field');
    }
    const updatedContact = await contactsOperations.updateContact(id, req.body);
    if (!updatedContact) {
      throw new CreateError(404, 'Not found');
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
