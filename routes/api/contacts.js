const express = require('express');
const Joi = require('joi');
const contacts = require('../../models/contacts');

const { HttpError } = require('../../helpers/HttpError');

const router = express.Router()

const addScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
}).min(1);

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result)
  } catch (error) {
    next(error);
  }
  
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const result = await contacts.getContactById(req.params.contactId);
    
    if (!result) {
      throw HttpError(404, "Contact not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = addScheme.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
    try {
      const id = req.params.contactId; 
      const result = await contacts.removeContact(id);
      if (!result) {
        throw HttpError(404, "Contact not found");
      }
      res.json({message: 'Delete Success!'});
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
    try {
      const { error } = addScheme.validate(req.body);
      if (error) {
      throw HttpError(400, error.message);
    }
      
    const id = req.params.contactId; 
      const result = await contacts.updateContact(id, req.body);
      if (!result) {
      throw HttpError(400, 'Not Found');
    }
      res.json(result);

  } catch (error) {
    next(error);
  }
})

module.exports = router
