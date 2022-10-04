const express = require('express')

const contacts = require('../../models/contacts');

const router = express.Router()

const { RequestError } = require('../../helpers');

const Joi = require('joi');

const addShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts()
    res.json(result)
    console.log(result);

  } catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId)
   
    if (!result) {
      throw RequestError(404, 'Not found')
    }
    res.json(result)

  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const { error } = addShema.validate({ name, email, phone })
    if (error) {
      throw RequestError(400, error.message);
    }
    const result = await contacts.addContact( name, email, phone )
    res.status(201).json(result);
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId)

    if (!result) {
      throw RequestError(404, 'Not found')
    }
    res.json(result)

  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log(contactId);
    const { name, email, phone } = req.body;
    const { error } = addShema.validate({ name, email, phone })
    if (error) {
      throw RequestError(400, error.message);
    }
    const result = await contacts.updateById( contactId, name, email, phone )
    console.log(result);
    if (!result) {
      throw RequestError(404, 'Not Found')
    }
    res.json(result);

  } catch (error) {
    next(error)
  }
})

module.exports = router
