const express = require('express');

const contactsService = require('../../models/contacts');

const router = express.Router();

const {HttpError} = require("../../helpers");

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result)
  } catch (error) {
    next(error)
  }
  
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      res.status(404);
      throw HttpError(404, `Contact with ${contactId} not found`);
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
