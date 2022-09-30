const express = require('express')

const contacts = require('../../models/contacts');

const router = express.Router()

const { RequestError } = require('../../helpers/RequestError');

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
    const { id } = req.params;
    const result = await contacts.getContactById(id)

    if (!result) {
      throw RequestError(404, 'Not found')
    }
    res.json(result)
    console.log(result);

  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = req.params;
    const { error } = addShema.validate({ name, email, phone })
    if (error) {
      throw RequestError(400, error.message);
    }
    const result = await contacts.addContact({ name, email, phone })
    res.status(201).json(result);
    console.log(result);
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id)

    if (!result) {
      throw RequestError(404, 'Not found')
    }
    res.json(result)
    console.log(result);

  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { name, email, phone } = req.params;
    const { error } = addShema.validate({ name, email, phone })
    if (error) {
      throw RequestError(400, error.message);
    }
    const result = await contacts.addContact({ name, email, phone })
    if (!result) {
      throw RequestError(404, 'Not Found')
    }
    res.json(result);
    console.log(result);
  } catch (error) {
    next(error)
  }
})

module.exports = router
