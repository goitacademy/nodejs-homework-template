const express = require('express');
// const Joi = require('joi');

const router = express.Router();

const contactsOperations = require('../../models/contacts');

const { validationBody } = require('../../middlewares/validateBody');
const { addContactSchema } = require('../../schemas/addContactValidation');
const {
  updateContactSchema,
} = require('../../schemas/updateContactValidation');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(contactId);

    if (!contact) {
      const error = new Error('Not found');
      error.status = 404;
      throw error;
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.post('/', validationBody(addContactSchema), async (req, res, next) => {
  try {
    const createdContact = await contactsOperations.addContact(req.body);

    res.status(201).json(createdContact);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const deletedContact = await contactsOperations.removeContact(contactId);

    if (!deletedContact) {
      const error = new Error(`Not found`);
      error.status(404);
      throw error;
    }

    res.status(200).json({ message: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put(
  '/:contactId',
  validationBody(updateContactSchema),
  async (req, res, next) => {
    try {
      const { contactId } = req.params;

      const updatedContact = await contactsOperations.updateContact(
        contactId,
        req.body
      );

      if (!updatedContact) {
        const error = new Error('Not found');
        error.status = 404;
        throw error;
      }

      res.status(200).json(updatedContact);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
