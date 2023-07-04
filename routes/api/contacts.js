const express = require('express');
const ctrl = require('../../controllers/contacts');
const { validateBody } = require('../../middlewares');
const schemas = require('../../schemas/contacts');

const router = express.Router();

// Отримання списку усіх контактів
router.get('/', ctrl.getAll);

// Отримання контакту по id
router.get('/:contactId', ctrl.getById);

// Додавання контакту
router.post('/', validateBody(schemas.addSchema), ctrl.add);

// Редагування контакту
router.put('/:contactId', validateBody(schemas.addSchema), ctrl.updateById);

// Видалення контакту
router.delete('/:contactId', ctrl.deleteById);

module.exports = router;
