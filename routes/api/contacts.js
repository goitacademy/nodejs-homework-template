const express = require('express');
const router = express.Router();

const ctrl = require("../../controllers/contacts")

const { validateBody, isValidId } = require("../../meddlewares")
const {addSchema, updateFavoriteSchema} = require("../../schemas/contacts")

// Отримати список всіх контактів
router.get('/', ctrl.getAll);

// Отримати контакт за його id
router.get('/:contactId', isValidId, ctrl.getByID);

// Додати новий контакт
router.post('/', ctrl.postContact);

// Видалити контакт за його id
router.delete('/:contactId',isValidId, ctrl.deleteContact);

// Оновити контакт за його id
router.put('/:contactId',isValidId, validateBody(addSchema), ctrl.putContact);

//Оновлення поля favorite
router.patch('/:contactId/favorite',isValidId, validateBody(updateFavoriteSchema), ctrl.updateFavorite);
module.exports = router;
