const express = require('express');
const contacts = require('../../models/contacts.js');
const Joi = require('joi')


const router = express.Router();

const dataSchema = Joi.object({
  name: Joi.string().max(30).required(),
  email: Joi.string().max(40).required(),
  phone: Joi.string().max(18).required()
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json({
      data: result,
    })
  }
  catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (result) {
      res.json({
        data: result,
      })
    } else {
      res.status(404);
      res.json({
        message: 'Not found',
      })
    }
  }
  catch (error) {
      next(error);
    }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = dataSchema.validate(req.body);
    if (error) {
      res.status(400);
      res.json({
        message: 'missing required name field',
        messageJoi: error.message
      })
      return
    }
    res.status(201);
     res.json({
       data: await contacts.addContact(req.body),
     })
  }
  catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (result) {
    res.json({
      message: 'contact deleted',
    })
  } else {
    res.status(404);
    res.json({
      message: 'Not found',
    })
    }
  }
  catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = dataSchema.validate(req.body);
    if (error) {
      res.status(400);
      res.json({
        message: 'missing fields',
        messageJoi: error.message
      })
      return
    }
  const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (result) {
      res.json({
        data: result,
      }) 
    } else {
    res.status(404);
    res.json({
      message: 'Not found',
    })
    }
  }
  catch (error) {
    next(error);
  }
})

module.exports = router;


