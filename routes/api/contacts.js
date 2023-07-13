const express = require('express');
const ctrl  = require('../../controllers/contacts');
const { validateBody, isValidId } = require('../../middlewares');
const { schemas } = require('../../models/contact');

const router = express.Router();

// Отримання списку усіх контактів
router.get('/',  ctrl.getAllContacts);

// Отримання контакту по id
router.get('/:contactId', isValidId, ctrl.getContactById);

// Додавання контакту
router.post('/', validateBody(schemas.addSchema), ctrl.addContact);

// Редагування контакту
router.put('/:contactId', isValidId, validateBody(schemas.addSchema), ctrl.updateContactById);

// Редагування полю favorite
router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact);

// Видалення контакту
router.delete('/:contactId', isValidId, ctrl.deleteContactById);

module.exports = router;
