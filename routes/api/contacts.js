const express = require('express');
// const createError = require("http-errors");
// const {NotFound}=require("http-errors");
const Joi = require("joi");

const contactSchema = Joi.object({
  name:Joi.string().required(),
  email:Joi.string().required(),
  phone:Joi.string().required(),
})

const contactsOperations = require("../../models/contacts");

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.status(200).json({ contacts });
  } catch(error) {
    next(error);
  }
  });


router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);
      if (!result) {res.status(404).json(` id=${contactId} not found`)
      // throw new NotFound(` id=${contactId} not found`);
    }
    res.status(200).json({ result });
  } catch(error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      res.status(400).json(` Missing required name field`)
      throw error;
    }
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({ result });
  } catch (error) {
    next(error)
  }
  })

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  try {
      const { error } = contactSchema.validate(req.body);
    if (error) {
      res.status(400).json(` Missing  fields`)
      throw error;
    }
    const { contactId } = req.params;
    const result = await contactsOperations.updateContactById(contactId, req.body);
    if (!result) {
      res.status(404).json(` Not found`)
    }
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
})

module.exports = router;


