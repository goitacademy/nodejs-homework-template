const express = require('express');
const router = express.Router();
const contactController = require('../../controllers/contactsControllers');
const authMiddleware = require('../../middleware/auth');

router.use(authMiddleware);

router.get('/', contactController.getAllContacts);
router.get('/:contactId', contactController.getContactById);
router.post('/', contactController.createContact);
router.put('/:contactId', contactController.updateContact);
router.delete('/:contactId', contactController.deleteContact);
router.patch('/:contactId/favorite', contactController.updateContactFavoriteStatus);

module.exports = router;
