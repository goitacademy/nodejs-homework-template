const express = require('express');
const ctrl  = require('../../controllers/contacts');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/contact');

const router = express.Router();

// Отримання списку усіх контактів
router.get('/', authenticate, ctrl.getAllContacts);

// Отримання контакту по id
router.get('/:contactId', authenticate, isValidId, ctrl.getContactById);

// Додавання контакту
router.post('/', authenticate, validateBody(schemas.addSchema), ctrl.addContact);

// Редагування контакту
router.put('/:contactId', authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateContactById);

// Редагування полю favorite
router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact);

// Видалення контакту
router.delete('/:contactId', authenticate, isValidId, ctrl.deleteContactById);

module.exports = router;
