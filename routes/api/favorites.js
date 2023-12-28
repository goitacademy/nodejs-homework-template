// routes/api/favorites.js
const express = require('express');
const router = express.Router();
const contacts = require('../../models/contacts');
// const updateStatusContact = require('../../models/contacts');

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (req.body.favorite === undefined) {
      return res.status(400).json({ message: 'missing field favorite' });
    }
    const updContact = await contacts.updateStatusContact(contactId, req.body.favorite);
    if (!updContact) {
        console.log(req.body)

      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(updContact);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
