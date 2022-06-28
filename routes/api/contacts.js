const express = require('express');

// const {NotFound} = require("http-errors");

const router = express.Router();
// const contactsOperations = require('../../models/contacts');
// const { Contact } = require('../../models/schema')
const { contacts: ctrl } = require('../../controllers');
const { validation } = require('../../middlewares')
const { joiSchema, joiSchemaFavoriteStatus } = require('../../models/schema')
const  ctrlWrapper  = require('../../helpers/ctrlWrapper');



router.get('/', ctrlWrapper(ctrl.listContacts))

router.get('/:contactId', ctrlWrapper(ctrl.getContactById))

router.post('/', validation(joiSchema, "missing required name field" ), ctrlWrapper(ctrl.addContact))

router.delete('/:contactId', ctrlWrapper(ctrl.removeContact))

router.put('/:contactId', validation(joiSchema,"missing fields"),ctrlWrapper(ctrl.updateContact))

router.patch('/:contactId/favorite', validation(joiSchemaFavoriteStatus,"missing field favorite"),ctrlWrapper(ctrl.updateStatusContact) )

module.exports = router
