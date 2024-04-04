const express = require('express');
const { body, validationResult } = require('express-validator');
const contactsService = require('../../services/contactsServices');

const router = express.Router();

const validateContact = [
  body('name').notEmpty().withMessage('Name'),
  body('email').isEmail().withMessage('Mail'),
  body('phone').notEmpty().withMessage('Phone'),
];

router.post('/', validateContact, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newContact = await contactsService.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', validateContact, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedContact = await contactsService.updateContact(req.params.contactId, req.body);
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

