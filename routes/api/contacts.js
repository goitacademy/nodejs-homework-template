// const { text } = require('express');
const express = require('express');
const Joi = require("joi")

const { createError } = require('../../helpers');

const contacts = require('../../models/contacts');

const router = express.Router();

const contactsShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw createError(404, 'Not found');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const {error} = contactsShema.validate(req.body)
    if (error){
      throw createError(400, "missing required name filed")
    }
    const result = await contacts.addContact(req.body)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = contactsShema.validate(req.body)
    if (error){
      throw createError(400, "missing fileds")
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body)
    if (!result) {
      throw createError(404, 'Not found');
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
});


router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId)
    if (!result) {
      throw createError(404, 'Not found');
    }
    res.json({message:"contact deleted"})
  } catch (error) {
    next(error)
  }
});

module.exports = router;