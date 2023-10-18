const express = require('express');
const controller = require('../../controller')
const checkToken = require('../middleware/authMiddleware')

const router = express.Router();

// дії з контактами
router.get('/', controller.getAllContacts);
router.get('/:contactId', controller.getContactById);
router.post('/', controller.newContact);
router.delete('/:contactId', controller.deleteContact);
router.put('/:contactId', controller.updatedContactById);
router.patch('/:contactId/favorite', controller.favoritStatus);
// дії з користувачами
router.post('/register', controller.userRegister); // Оновлено шлях до реєстрації
router.post('/logout', checkToken, controller.userLogout);
router.get('/current', checkToken, controller.corentUserData)

module.exports = router;
