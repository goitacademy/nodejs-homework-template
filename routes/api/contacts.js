const express = require('express');

const ctrl = require('../../controllers/contacts');

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts")

const router = express.Router();

// Маршрут для отримання списку всіх контактів.

router.get('/', ctrl.listContacts)

// Маршрут для отримання контакту за ідентифікатором

router.get('/:contactId', ctrl.getContactById)

// Маршрут для додавання нового контакту.

router.post('/', validateBody(schemas.addSchema), ctrl.addContact)

// Маршрут для зміни контакту за ідентифікатором

router.put('/:contactId', validateBody(schemas.addSchema), ctrl.changeContact)

// Маршрут для видалення контакту за ідентифікатором

router.delete('/:contactId', ctrl.removeContact)


module.exports = router
