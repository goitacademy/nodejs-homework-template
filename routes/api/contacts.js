const express = require('express');
const Joi = require("joi");
const router = express.Router()
const contacts = require('../../models/contacts')

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.status(200).json(result)
  }
  catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
       return res.status(404).json({
                message: `Not found`
            })
    }
    res.status(200).json(result)
  }
  catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: `Missing required name field`
      })
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  }
   catch(error) {
        next(error);
    }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      return res.status(404).json({
        message: `Not found`
      })
    }
    res.status(200).json({
      message: "Contact deleted"
    })
  }

    catch(error) {
        next(error);
    }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: `Missing fields`
      })
    }
        const {contactId} = req.params;
        const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      return res.status(404).json({
        message: `Not found`
      })
    }
        res.status(200).json(result);
    }
    catch(error) {
        next(error);
    }
})

module.exports = router
