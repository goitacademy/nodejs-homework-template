const express = require('express')

const router = express.Router();
const contacts = require("../../models/contacts");
const { HttpError } = require('../../helpers');
const { addContact } = require('../../models/contacts');
const Joi = require('joi');

const addShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
})

router.get('/', async (req, res, next) => {
  try {
    const results = await contacts.listContacts();
    res.json(results);
  } catch (error) {
    next(error);
  }
  
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result)
    
  } catch (error) {
    next(error);
  }
}
)

router.post('/', async (req, res, next) => {
  try {
    const { error } = addShema.validate(req.body);
    if (error) {
      throw HttpError(error, error.message)
     }
    const result = await addContact(req.body)
   res.status(201).json(result)
    
  } catch (error) {
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
