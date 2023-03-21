const express = require('express')

const router = express.Router()

const {contacts: ctrl } = require('../../controllers')

const {validation} = require('../../middlewares');
const {joiSchema, joiSchemaFavorite} = require('../../models/contact');



router.get('/', ctrl.listContacts);

router.get('/:id', ctrl.getById);

router.post('/', validation(joiSchema),ctrl.addContact);

router.put('/:id', validation(joiSchema), ctrl.updateContact);

router.patch('/:contactId/favorite',  validation(joiSchemaFavorite), ctrl.updateStatusContact);

router.delete('/:contactId', ctrl.removeContact);


module.exports = router
