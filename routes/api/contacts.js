const express = require('express');
const router = express.Router();
const Contact = require('../../model');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contact.listContacts();
    return res.json({ status: 'success', code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contact.getContactById(req.params.contactId);
    if (!contact) {
      res
        .status(404)
        .json({ status: 'error', code: 404, data: 'Contact does not exist' });
    }
    return res.json({ status: 'success', code: 200, data: { contact } });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
