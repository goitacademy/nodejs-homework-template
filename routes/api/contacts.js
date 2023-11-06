

const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const contactsController = require('../../controllers/contactsController');

router.use(authMiddleware);

router.get('/', contactsController.getAllContacts);
router.get('/:contactId', contactsController.getContactById);
router.post('/', contactsController.createContact);
router.put('/:contactId', contactsController.updateContact);
router.delete('/:contactId', contactsController.deleteContact);

module.exports = router;
