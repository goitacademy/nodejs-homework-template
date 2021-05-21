const express = require('express');
const Contacts = require('../../model/index');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    res.json({ status: 'success', code: 200, payload: { contacts } });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const requestedContact = await Contacts.getContactById(req.params.contactId);

    if (requestedContact) {
      res.json({ status: 'success', code: 200, payload: { contacts: requestedContact } });
    }

    res.status(404).json({ status: 'error', code: 404, message: 'Not found.' });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newContact = await Contacts.addContact(req.body);
    res
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
      res.json({
        status: 'success',
        code: 200,
        message: 'Contact deleted.',
        payload: { contacts: removedContact },
      });
    }
    res.status(404).json({ status: 'error', code: 404, message: 'Not found.' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const updatedContact = await Contacts.updateContact(req.params.contactId, req.body);
    if (updatedContact) {
      res.json({
        status: 'success',
        code: 200,
        message: 'The contact was updated.',
        payload: { contacts: updatedContact },
      });
    }
    res.status(404).json({ status: 'error', code: 404, message: 'Not found.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
