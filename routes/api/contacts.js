const express = require('express')
const contactsService = require('../../models/contacts')
const { HttpError } = require('../../helpers');

const router = express.Router()

router.get('/', async (req, res, next) => {
  const result = await contactsService.listContacts();
  res.status(200).json(result);
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(404);
    }
    res.status(200).json(result);
  }
  catch (error) {
    next(error);
  } 
})

router.post('/', async (req, res, next) => {
  try {
    if ( !('name' in req.body && 'email' in req.body && 'phone' in req.body) ) {
      throw HttpError('400', 'Missing required name field');
    }
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
      throw HttpError(404);
    }
    res.status(200).json({
      message: 'contact deleted',
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
