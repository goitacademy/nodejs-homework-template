const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/contacts-controllers');

const { validateBody } = require('../../middlewares');

const { isValidId } = require('../../middlewares');

const schemas = require('../../schemas/contacts-schemas');

// Отримати всі контакти
router.get('/', ctrl.getAll);

// Отримати контакт за id
router.get('/:id',isValidId, ctrl.getById);

// Додати контакт
router.post('/', validateBody(schemas.addSchema), ctrl.add);

// Оновити контакт за id
router.put('/:id', isValidId, validateBody(schemas.addSchema), ctrl.updateById);

// Оновити favorite
router.patch('/:id/favorite', isValidId, validateBody(schemas.updateFavoriteContactSchema), ctrl.updateFavorite);

 // Видалити контакт за id
router.delete('/:id', isValidId, ctrl.deleteById)


module.exports = router;
