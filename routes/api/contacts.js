const express = require('express')

const operations = require("../../models/contacts");

const { RequestError } = require('../../helpers');
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await operations.listContacts();
    res.json(contacts);
    console.log('req:', req.body);
  }
  catch (err) {
    next(err);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await operations.getContactById(req.params.contactId);
    if (!contact) {
      throw RequestError(404, 'Not found');
    }
    res.json(contact);
  }
  catch (err) {
    next(err);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const contact = await operations.addContact(req.body);
    res.json(contact);
  } catch (err) {
    next(err);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'delete req' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'put req message' })
})

module.exports = router
