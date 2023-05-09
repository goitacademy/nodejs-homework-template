const express = require('express');

const router = express.Router();

const ctrl=require('../../controllers/contacts')

const { validateBody } = require('../../middlewares');

const schemas = require('../../schemas/contacts');

// Отримати всі контакти
router.get('/', ctrl.getAll);

// Отримати контакт за id
router.get('/:id', ctrl.getById );

// Додати контакт
router.post('/', validateBody(schemas.addSchema), ctrl.add);

// Оновити контакт за id
router.put('/:id', validateBody(schemas.addSchema), ctrl.updateById);

 // Видалити контакт за id
router.delete('/:id', ctrl.deleteById)


module.exports = router;