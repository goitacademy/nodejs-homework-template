const express = require("express");
const ctrl = require("../../controllers/contactsContr");


const router = express.Router();
const {schemas} = require("../../models/contact");
const { validateBody, isValidId, authenticate } = require('../../middlewares');


// GET: отримання всіх контактів або фільтрація всіх контактів за полем "обраний"
router.get('/', authenticate, ctrl.listContacts);


// GET: отримання контакту по ід
router.get('/:id', authenticate, isValidId, ctrl.getContactById);


// POST: додавання нового контакту
router.post('/', authenticate, validateBody(schemas.addSchema), ctrl.addContact);


// DELETE: видалення контакту по ід
router.delete('/:id', authenticate, isValidId, ctrl.removeContact);


// PUT: оновлення наявного контакту
router.put('/:id', authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateContact);

// PATCH: оновлення статусу контакту - обраний чи ні
router.patch('/:id/favorite', authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact);

module.exports = router;
