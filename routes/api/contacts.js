const express = require('express')

const router = express.Router()

const Joi = require('joi')

const contacts = require('../../models/contacts')

const HttpErr = require('../../helpers/HttpErr')

const addScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
})

router.get('/', async (req, res, next) => {
  try {
    const response = await contacts.listContacts();
    res.json(response)
  } catch (error) {
    res.status(500).json({
      message: 'server error'
    })
  }

})

router.get('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params
    const response = await contacts.getContactById(contactId)
    if (!response) {
      throw HttpErr(404, 'Not Foun')
    }
    res.json(response)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = addScheme.validate(req.body)
    if (error) {
      throw HttpErr(400, error.message)
    }
    const response = await contacts.addContact(req.body);
    res.status(201).json(response);

  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { id } = res.params;
    const response = await contacts.removeContact(id)
    if (!response) {
      throw HttpErr(404, 'Not Foun')
    }
    res.status({
      message: 'Гей чистка успішно виконана'
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = addScheme.validate(req.body)
    if (error) {
      throw HttpErr(400, error.message)
    }
    const { id } = res.params;
    const response = await contacts.updateContact(id, req.body)
    if (!response) {
      throw HttpErr(404, 'Not Foun')
    }
    res.json(response);
  } catch (error) {
    next(error)
  }
})

module.exports = router
