// const express = require('express')

// const router = express.Router()

// router.get('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// module.exports = router
 
const express = require('express');
const router = express.Router();
const contacts = require('../../models/contacts');

// GET /api/contacts
router.get('/', async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    res.json(allContacts);
  } catch (error) {
    next(error);
  }
});

// GET /api/contacts/:contactId
router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await contacts.getContactById(req.params.contactId);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

// POST /api/contacts
router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'missing required name, email or phone field' });
    }
    const newContact = await contacts.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/contacts/:contactId
router.delete('/:contactId', async (req, res, next) => {
  try {
    const result = await contacts.removeContact(req.params.contactId);
    if (result) {
      res.json({ message: 'contact deleted' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

// PUT /api/contacts/:contactId
router.put('/:contactId', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name && !email && !phone) {
      return res.status(400).json({ message: 'missing fields' });
    }
    const updatedContact = await contacts.updateContact(req.params.contactId, req.body);
    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
