const express = require('express')
const router = express.Router()
const Joi = require("joi");

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
});

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("./../../models/contacts.js");

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({
      method: req.method,
      endpoint: req.originalUrl,
      status: 'success',
      message: 'Contacts fetched successfully',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).json({
        method: req.method,
        endpoint: req.originalUrl,
        status: 'error',
        message: 'Contact not found',
      });
    }
    res.status(200).json({
      method: req.method,
      endpoint: req.originalUrl,
      status: 'success',
      message: 'Contact fetched successfully',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error, value } = addSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        method: req.method,
        endpoint: req.originalUrl,
        status: 'error',
        message: error.details[0].message,
      });
    }
    const newContact = await addContact(value);
    res.status(201).json({
      method: req.method,
      endpoint: req.originalUrl,
      status: 'success',
      message: 'Contact added successfully',
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const removedContact = await removeContact(contactId);
    if (!removedContact) {
      return res.status(404).json({
        method: req.method,
        endpoint: req.originalUrl,
        status: 'error',
        message: 'Contact not found',
      });
    }
    res.status(200).json({
      method: req.method,
      endpoint: req.originalUrl,
      status: 'success',
      message: 'Contact removed successfully',
      data: removedContact,
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const { error, value } = addSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        method: req.method,
        endpoint: req.originalUrl,
        status: 'error',
        message: error.details[0].message,
      });
    }
    const updatedContact = await updateContact(contactId, value);
    if (!updatedContact) {
      return res.status(404).json({
        method: req.method,
        endpoint: req.originalUrl,
        status: 'error',
        message: 'Contact not found',
      });
    }
    res.status(200).json({
      method: req.method,
      endpoint: req.originalUrl,
      status: 'success',
      message: 'Contact updated successfully',
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router
