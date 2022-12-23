
const express = require('express')
const Joi = require('joi');

const {HttpError} = require("../../helpers")

const contactsOperations = require("../../models/contacts")

const router = express.Router()

const addSchema = Joi.object({
  name: Joi.required(),
  email: Joi.required(),
  phone: Joi.required(),
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsOperations.listContacts()
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);
    if (!result) {
      
      throw HttpError(404)
    }
    res.json(result)
  }
  catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message)
    }
    const result = await contactsOperations.addContact(req.body)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const deletedContact = await contactsOperations.removeContact(id);
    if (!deletedContact) {
      throw HttpError(404);
    }
    res.status(200).json({
      message: 'Contact deleted',
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const body = req.body;
    const result = await contactsOperations.updateContact(id, body);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});


module.exports = router
