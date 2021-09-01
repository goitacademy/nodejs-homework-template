const express = require('express')

const { joiSchema } = require("../../models/contact");
const { validation } = require("../../middlewares");
const ctrl = require("../../controllers/contacts");

const validationMiddleware = validation(joiSchema);

const router = express.Router()

router.get('/', ctrl.getAllContacts);

router.get('/:contactId', ctrl.getById);

router.post('/', validationMiddleware, ctrl.add);

router.delete('/:contactId', ctrl.delContactById);

router.patch('/:contactId', validationMiddleware, ctrl.updateContactById);

router.patch('/:contactId/favorite', ctrl.updateContactByFavorite);

module.exports = router

    // "name": "Lois Lane",
    // "email": "lois-super@gmail.com,
    // "phone": "(323) 231-5678"