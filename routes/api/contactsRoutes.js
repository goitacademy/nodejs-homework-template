const express = require("express");
const ctrl = require("../../controllers/contactsContr");


const router = express.Router();
const {schemas} = require("../../models/contact");
const { validateBody, isValidId } = require('../../middlewares');


// GET: отримання всіх контактів
router.get('/', ctrl.listContacts);


// GET: отримання контакту по ід
router.get('/:id', isValidId, ctrl.getContactById);


// POST: додавання нового контакту
router.post('/', validateBody(schemas.addSchema), ctrl.addContact);


// DELETE: видалення контакту по ід
router.delete('/:id', isValidId, ctrl.removeContact);


// PUT: оновлення наявного контакту
router.put('/:id', isValidId, validateBody(schemas.addSchema), ctrl.updateContact);

// PATCH: оновлення статусу контакту - обраний чи ні
router.patch('/:id/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact);

module.exports = router;
