const express = require('express')

const router = express.Router()

const {contacts: ctrl} = require('../../controllers')


const {joiSchema, joiSchemaFavorite} = require('../../models/contact');
const {validationAddContact, validationUpDateContact, validationUpStatusContact} = require("../../middlewares/validation");


router.get('/', ctrl.listContacts);

router.get('/:id', ctrl.getById);

router.post('/', validationAddContact(joiSchema), ctrl.addContact);

router.put('/:id', validationUpDateContact(joiSchema), ctrl.updateContact);

 router.patch('/:contactId/favorite', validationUpStatusContact(joiSchemaFavorite), ctrl.updateStatusContact);

router.delete('/:contactId', ctrl.removeContact);


module.exports = router
