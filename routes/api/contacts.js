const express = require('express')
const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../models/contacts');
const Joi = require("joi");

const router = express.Router()

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: 'success',
      code: 200,
      data: {contacts},
    })
  } catch (error) {
    const { status = 500, message = 'Server error' } = error;
    res.status(status).json({ message });
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      const error = new Error('Not found');
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'success',
      code: 200,
      data: {contact},
    })
  } catch (error) {
    const { status = 500, message = 'Server error' } = error;
    res.status(status).json({ message });
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newContactBody = req.body;

    const {error} = addSchema.validate(newContactBody);
    if(error) {
        return res.status(400).json({ message: "missing required name field" });
    }

    const newContact = await addContact(newContactBody);
    res.json({
      status: 'success',
      code: 201,
      data: {newContact},
    })
  } catch (error) {
    const { status = 500, message = 'Server error' } = error;
    res.status(status).json({ message });
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const results = await removeContact(contactId);
    if (!results) {
      const error = new Error('Not found');
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'success',
      code: 200,
      message: "contact deleted",
    })
  } catch (error) {
    const { status = 500, message = 'Server error' } = error;
    res.status(status).json({ message });
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactBody = req.body;

    const {error} = addSchema.validate(contactBody);
    if(error) {
        return res.status(400).json({ message: "missing fields" });
    }

    const changedContact = await updateContact(contactId, contactBody);
    if (!changedContact) {
      const error = new Error('Not found');
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'success',
      code: 200,
      data: {changedContact},
    })
  } catch (error) {
    const { status = 500, message = 'Server error' } = error;
    res.status(status).json({ message });
  }
})

module.exports = router
