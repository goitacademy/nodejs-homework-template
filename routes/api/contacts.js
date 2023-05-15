const express = require('express')
const contactsService = require('../../models/contacts')
const { HttpError } = require('../../helpers');

const router = express.Router()

router.get('/', async (req, res, next) => {
  const result = await contactsService.listContacts();
  res.json(result);
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  }
  catch (error) {
    next(error);
  } 
})

router.post('/', async (req, res, next) => {
  try {
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  }
  catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Movie with ${contactId} not found`);
    }
    res.json({
      message: 'Delete success',
    });
  }
  catch (error) {
    next(error);
  }
  
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Movie with ${contactId} not found`);
    }
    res.json(result);
  }
  catch (error) {
    next(error);
  }
})

module.exports = router
