const express = require('express');
const router = express.Router();
const Contacts = require('../../controllers/contacts');

const { validateContact, validateId } = require('./../api/validation');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    res.json({ status: 'success', code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  validateId(req.params.id);
  try {
    const contact = await Contacts.getContactById(req.params.id);
    if (contact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found' });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'missing fields' });
  }

  try {
    const contact = await Contacts.addContact(req.body);
    res.status(201).json({ status: 'success', code: 201, data: { contact } });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  const response = await validateId(req.params.id);
  try {
    const contact = await Contacts.removeContact(req.params.id);
    if (contact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found' });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const contactId = req.params.id;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'missing fields in req.body' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'invalid email format' });
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: 'invalid phone number format' });
    }
    validateId(contactId);
    const updatedContact = await Contacts.updateContact(contactId, {
      name,
      email,
      phone,
    });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        updatedContact,
      },
    });
  } catch (error) {
    next(error);
  }
});


router.patch('/:id', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
