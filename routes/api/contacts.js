const express = require('express');
const router = express.Router();

const ctrl = require("../../controllers/contacts")

const { validateBody } = require("../../meddlewares")
const {addSchema} = require("../../schemas/contacts")

// Отримати список всіх контактів
router.get('/', ctrl.getAll);

// Отримати контакт за його id
router.get('/:contactId', ctrl.getByID);


// Додати новий контакт
router.post('/', validateBody(addSchema),ctrl.postContact);

// Видалити контакт за його id
router.delete('/:contactId', ctrl.deleteContact);

// Оновити контакт за його id
router.put('/:contactId', validateBody(addSchema), ctrl.putContact);

module.exports = router;
