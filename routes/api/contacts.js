const express = require('express');
const router = express.Router();

const ctrl = require("../../controllers/contacts")

const { validateBody, isValidId, authenticate } = require("../../meddlewares")
const {addSchema, updateFavoriteSchema} = require("../../schemas/contacts")

// Отримати список всіх контактів
router.get('/', authenticate, ctrl.getAll);

// Отримати контакт за його id
router.get('/:contactId',authenticate, isValidId, ctrl.getByID);

// Додати новий контакт
router.post('/',authenticate, ctrl.postContact);

// Видалити контакт за його id
router.delete('/:contactId',authenticate,isValidId, ctrl.deleteContact);

// Оновити контакт за його id
router.put('/:contactId',authenticate,isValidId, validateBody(addSchema), ctrl.putContact);

//Оновлення поля favorite
router.patch('/:contactId/favorite',authenticate,isValidId, validateBody(updateFavoriteSchema), ctrl.updateFavorite);
module.exports = router;
