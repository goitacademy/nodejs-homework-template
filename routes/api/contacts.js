const express = require('express');

const router = express.Router();

const { contacts: ctrl } = require('../../controllers');
const { validation,auth } = require('../../middlewares')
const { joiSchema, joiSchemaFavoriteStatus } = require('../../models/contacts')
const  ctrlWrapper  = require('../../helpers/ctrlWrapper');



router.get('/', auth,ctrlWrapper(ctrl.listContacts))

router.get('/:contactId', ctrlWrapper(ctrl.getContactById))

router.post('/', auth,validation(joiSchema, "missing required name field" ), ctrlWrapper(ctrl.addContact))

router.delete('/:contactId', ctrlWrapper(ctrl.removeContact))

router.put('/:contactId', validation(joiSchema,"missing fields"),ctrlWrapper(ctrl.updateContact))

router.patch('/:contactId/favorite', validation(joiSchemaFavoriteStatus,"missing field favorite"),ctrlWrapper(ctrl.updateStatusContact) )

module.exports = router
