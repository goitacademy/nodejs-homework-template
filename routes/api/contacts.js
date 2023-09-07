const express = require('express');

const contacts = require('../../models/contacts');
const { createError } = require('../../helpers');
const { contactSchema } = require('../../schemas');

const router = express.Router()

router.get('/', async (res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result)
  } catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw createError(404);
    }
    res.json(result)
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {error} = contactSchema(req.body);
    
    if (error) {
      throw createError(404, "missing required name")
    }
    const result = await contacts.addContact(req.body);
    res.status(201).send(result)
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    
    if (!result) {
      throw createError(404);
    }

    res.json({
      message : 'deleted'  });
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    
    const { error } = contactSchema(req.body);
    if (error){
      throw createError('Missing required fields');
    }
    
    const { contactId } = req.params;
      const result = await contacts.updateContactById(contactId, req.body );

      if (!result) {
        throw createError(404);
      }

      res.json(result);
  } catch (error) {
    next(error);
  }

})

module.exports = router
