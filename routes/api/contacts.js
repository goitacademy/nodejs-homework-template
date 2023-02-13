const express = require('express');

const contactsModel = require('../../models/contacts');

const router = express.Router();

const createContactSchema = require('../../validation/createContactSchema');
const updateContactSchema = require('../../validation/updateContactSchema');

router.get('/', async (req, res, next) => {
  try {
    const data = await contactsModel.listContacts();
    res.json({ data, message: 'list of all contacts' });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const data = await contactsModel.getContactById(req.params.contactId);
    if (!data) {
      res.status(404);
      res.json({ message: 'User not found' });
      return;
    }
    res.json({ data, message: 'template message' });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { body } = req;

    const { error } = createContactSchema.validate(body);

    if (error) {
      res.status(400);
      res.json({ message: error.details[0]?.message });
      return;
    }
    const newContact = await contactsModel.addContact(body);
    if (!newContact) {
      res.status(400);
      res.json({ message: 'Contact with this fields already exist' });
      return;
    }
    res.status(201);
    res.json({ data: newContact, message: 'Create succesfull' });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await contactsModel.getContactById(contactId);
    if (!data) {
      res.status(404);
      res.json({ message: 'User not found' });
      return;
    }
    await contactsModel.removeContact(contactId);
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { body } = req;
    const { contactId } = req.params;
    const { error } = updateContactSchema.validate(body);

    if (error) {
      res.status(400);
      res.json({ message: error.details[0]?.message });
      return;
    }

    const data = await contactsModel.getContactById(contactId);
    if (!data) {
      res.status(404);
      res.json({ message: 'User not found' });
      return;
    }
    const updateContact = await contactsModel.updateContact(contactId, body);
    res.status(200);
    res.json({ data: updateContact, message: 'Contact update' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
