const express = require('express');
const { NotFound, BadRequest } = require('http-errors');
const Joi = require('joi');
const router = express.Router();

const productSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const contactsOperations = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  try {
    const listContacts = await contactsOperations.listContacts();
    res.json({
      status: 'success',
      code: 200,
      data: { listContacts },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contact = await contactsOperations.getContactById(contactId);

    if (!contact) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }

    res.json({
      status: 'success',
      code: 200,
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }

    const addedContact = await contactsOperations.addContact(req.body);

    res.status(201).json({
      status: 'success',
      cose: 201,
      data: {
        addedContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const deletedId = await contactsOperations.removeContact(contactId);
    if (!deletedId) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }

    res.json({
      status: 'success',
      code: 200,
      data: { message: 'contact deleted' },
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
