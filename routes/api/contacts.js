const express = require('express');
const ctrl = require('../../controllers/contacts');
const { validateBody, isValidId } = require('../../middlewares');
const { schemas } = require('../../models/contact');

const router = express.Router();

// Отримання списку усіх контактів
router.get('/', ctrl.getAll);

// Отримання контакту по id
router.get('/:contactId', isValidId, ctrl.getById);

// Додавання контакту
router.post('/', validateBody(schemas.addSchema), ctrl.add);

// Редагування контакту
router.put('/:contactId', isValidId, validateBody(schemas.addSchema), ctrl.updateById);

// Редагування полю favorite
router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact);

// Видалення контакту
router.delete('/:contactId', isValidId, ctrl.deleteById);

module.exports = router;
