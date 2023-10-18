const express = require('express');
const controller = require('../../controller')

const router = express.Router();

router.get('/', controller.getAllContacts);
router.get('/:contactId', controller.getContactById);
router.post('/', controller.newContact);
router.delete('/:contactId', controller.deleteContact);
router.put('/:contactId', controller.updatedContactById);
router.patch('/:contactId/favorite', controller.favoritStatus);
router.post('/register', controller.userRegister); // Оновлено шлях до реєстрації

module.exports = router;
