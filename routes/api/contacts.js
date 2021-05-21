const express = require('express');
const Contacts = require('../../model/index');
const { validationAddedContact, validationUpdatedContact, validationEditedContact } = require('./validation');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.json({ status: 'success', code: 200, payload: { contacts } });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const requestedContact = await Contacts.getContactById(req.params.contactId);

    if (requestedContact) {
      return res.json({ status: 'success', code: 200, payload: { contacts: requestedContact } });
    }

    return res.status(404).json({ status: 'error', code: 404, message: 'Not found.' });
  } catch (error) {
    next(error);
  }
});

router.post('/', validationAddedContact, async (req, res, next) => {
  try {
    const newContact = await Contacts.addContact(req.body);
    return res
      .status(201)
      .json({ status: 'success', code: 201, message: 'New contact was created.', payload: { contacts: newContact } });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const removedContact = await Contacts.removeContact(req.params.contactId);
    if (removedContact) {
      return res.json({
        status: 'success',
        code: 200,
        message: 'Contact deleted.',
        payload: { contacts: removedContact },
      });
    }
    return res.status(404).json({ status: 'error', code: 404, message: 'Not found.' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', validationUpdatedContact, async (req, res, next) => {
  try {
    const updatedContact = await Contacts.updateContact(req.params.contactId, req.body);

    if (!updatedContact) {
      return res.status(404).json({ status: 'error', code: 404, message: 'Not found.' });
    }

    return res.json({
      status: 'success',
      code: 200,
      message: 'The contact was updated.',
      payload: { contacts: updatedContact },
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:contactId/edit', validationEditedContact, async (req, res, next) => {
  try {
    const updatedContact = await Contacts.updateContact(req.params.contactId, req.body);

    if (!updatedContact) {
      return res.status(404).json({ status: 'error', code: 404, message: 'Not found.' });
    }

    return res.json({
      status: 'success',
      code: 200,
      message: 'The contact was updated.',
      payload: { contacts: updatedContact },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
