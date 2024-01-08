const express = require('express')

const router = express.Router()

const contacts = require("../../models/contacts")

const {HttpError} = require ("../../helpers")

router.get('/', async (req, res, next) => {
  // res.json(contacts);
  try {
    const result = await contacts.listContacts();
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
})

router.post('/', async (req, res, next) => { 
  try { 
    // const { error } = addScheme.validate(req.body);
    // if (error) {
    //   throw HttpError(400, error.message);
    // }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch(error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
