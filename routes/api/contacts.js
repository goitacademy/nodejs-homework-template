const express = require('express');
const router = express.Router();
const contactsController = require('../../controllers/contactsController');
const authMiddleware = require('../../middleware/authMiddleware'); 

router.use(authMiddleware);

router.get('/', contactsController.listContacts);
router.get('/:id', contactsController.getById);
router.post('/', contactsController.addContact);
router.delete('/:id', contactsController.removeContact);
router.put('/:id', contactsController.updateContact);
router.patch('/:contactId/favorite', contactsController.updateFavoriteStatus);

module.exports = router;