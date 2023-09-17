const express = require("express");
const ctrl = require("../../controllers/contactsContr");


const router = express.Router();
const addSchema = require("../../schemas/contactsSchema");
const {validateBody} =require('../../middlewares')


// GET: отримання всіх контактів
router.get('/', ctrl.listContacts);


// GET: отримання контакту по ід
router.get('/:id', ctrl.getContactById);


// POST: додавання нового контакту
router.post('/', validateBody(addSchema.addSchema), ctrl.addContact);


// DELETE: видалення контакту по ід
router.delete('/:id', ctrl.removeContact);


// PUT: оновлення наявного контакту
router.put('/:id', validateBody(addSchema.addSchema), ctrl.updateContact);

module.exports = router;
