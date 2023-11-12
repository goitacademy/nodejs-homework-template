const express = require('express');
const router = express.Router();
const contactController = require('../../controllers/contacts.controller');

router.get('/', contactController.getAll);

router.get('/:contactId', contactController.getById);

router.post('/', contactController.createContact);

router.put('/:contactId', contactController.updateContact);

router.patch('/:contactId/favorite', contactController.updateFavorite);

router.delete('/:contactId', contactController.removeContact);

module.exports = router;
