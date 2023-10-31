const express = require('express');
const router = express.Router();
const contactsController = require('../../Controllers/contactsController');

router.patch('/:contactId/favorite', contactsController.updateFavoriteStatus);

module.exports = router;
