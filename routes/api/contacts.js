const express = require('express')

const router = express.Router()

const contactsOperations = require('../../models/contacts')
const Joi = require('joi')

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

const putSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
})

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    }
  })
  } catch (error) {
    next(error)
  }
  
})

router.get('/:contactId', async (req, res, next) => {
try {
  const {contactId} = req.params;
  const contact = await contactsOperations.getContactById(contactId);
  if (!contact) {
    const error = new Error("Contact with each id not found")
    error.status = 404;
    throw error;

  }
    res.json({
    status: "success",
    code: 200,
    data: {
      result: contact,
    }
  })
} catch (error) {
  next(error)
}
})

router.post('/', async (req, res, next) => {
  try {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }
  const addingContact = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result: addingContact,
      }
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {

  try {
  const {contactId} = req.params;
  const deletingContact = await contactsOperations.removeContact(contactId)
  if (!deletingContact) {
    const error = new Error("Contact with each id not found")
    error.status = 404;
    throw error;

  }
    res.json({
    status: "success",
    code: 200,
    data: {
      result: deletingContact,
    }
  })
} catch (error) {
  next(error)
}
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = putSchema.validate(req.body);
  if (error) {
    error.status = 400;
    throw error;
    
    }
    const { contactId } = req.params;
  const contact = await contactsOperations.updateContact(contactId, req.body);
  if (!contact) {
    const error = new Error("Contact with each id not found")
    error.status = 404;
    throw error;

  }
    res.json({
    status: "success",
    code: 200,
    data: {
      result: contact,
    }
  })
} catch (error) {
  next(error)
}
})

module.exports = router
