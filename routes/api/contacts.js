const express = require('express');
const Joi = require('joi');
const contactsOperation = require('../../models/contacts');

const router = express.Router();

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperation.listContacts();
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log(req.params);
    const contactById = await contactsOperation.getContactById(contactId);
    if (!contactById) {
      const error = new Error(`Contact by id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contactById,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const newContact = await contactsOperation.addContact(req.body);
    console.log(newContact);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        newContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removeContact = await contactsOperation.removeContact(contactId);
    if (!removeContact) {
      const error = new Error(`Contact by id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'success',
      message: 'contact deleted',
      code: 200,
      data: { removeContact },
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const updateContact = await contactsOperation.updateContact(
      contactId,
      req.body
    );
    if (!updateContact) {
      const error = new Error(`Contact by id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'success',
      code: 200,
      data: { updateContact },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
