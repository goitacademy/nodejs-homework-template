const express = require('express')
// const { response } = require('../../app')
const Joi = require('joi');
const { response } = require('../../app');

const router = express.Router()

const contactsOps = require('../../models/contacts')

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOps.listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: {
        result :contacts,
      },})
  } catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await contactsOps.getContactById(contactId);
    if (!result) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result
      },
    })
  } catch (error) {
    next(error);
   }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      const err = new Error(error.message);
      err.status = 400;
      throw err;
    }
    const { name, email, phone } = req.body;
    const result = await contactsOps.addContact(name, email, phone);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result
      },
    })
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await contactsOps.removeContact(contactId);
    if (!result) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result
      },
    })
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      const err = new Error(error.message);
      err.status = 400;
      throw err;
    }
    const { contactId } = req.params;
    const result = await contactsOps.updateContact(contactId, req.body);
    res.json({
      status: 'success',
      code: 200,
      data: {
        result
      },
    })
  } catch (error) {
    next(error);
  }
})

module.exports = router
