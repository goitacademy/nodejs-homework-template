const express = require('express');
const Joi = require('joi');

const router = express.Router();

const contacts = require("../../models/contacts");

const { HttpError } = require("../../helpers");

const addScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
  // res.json(contacts);
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (err) {
    next(err);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log(req.params);
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
})

router.post('/', async (req, res, next) => { 
  try {
    console.log(req.body);
    const { error } = addScheme.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
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
