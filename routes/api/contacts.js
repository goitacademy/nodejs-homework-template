const express = require('express')
const Joi = require('joi')

const contacts = require('../../models/contacts')

const {HttpError} = require('../../helpers')

const router = express.Router()

const addSchema = Joi.object({
  name: Joi.string().required(),
email: Joi.string().required(),
phone: Joi.string().required(),
}) 


router.get('/', async (req, res) => {
  try {
    const result = await contacts.listContacts();
}
  catch (error) { next(error); }

})

router.get('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
throw HttpError(404, 'Not found')
        }
         res.status(200).json(result);
  }
  catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
    } 
  catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({
      message: "Delete sucsses"
    })
  }
  catch (error) { next(error) }
}) 

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const {contactId} = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError (404, 'Not found');
    }
    res.json(result)
  }
  catch (error) {
    next(error);
  }
})

module.exports = router

