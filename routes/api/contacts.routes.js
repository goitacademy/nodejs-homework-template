const express = require('express');
const router = express.Router();
const contactController = require('../../controllers/contacts.controller');
const { auth } = require('../../authorization/auth');

router.get('/', auth, contactController.getAll);

router.get('/:contactId', auth, contactController.getById);

router.post('/', auth, contactController.createContact);

router.put('/:contactId', auth, contactController.updateContact);

router.patch('/:contactId/favorite', auth, contactController.updateFavorite);

router.delete('/:contactId', auth, contactController.removeContact);

module.exports = router;
