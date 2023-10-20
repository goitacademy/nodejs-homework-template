const express = require('express');

const controller = require('../../controllers')

const router = express.Router();

// дії з контактами
router.get('/', controller.getAllContacts);
router.get('/:contactId', controller.getContactById);
router.post('/', controller.newContact);
router.delete('/:contactId', controller.deleteContact);
router.put('/:contactId', controller.updatedContactById);
router.patch('/:contactId/favorite', controller.favoritStatus);

module.exports = router;
