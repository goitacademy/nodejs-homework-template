const express = require('express');
// const { json } = require('express');
const ctrl = require("../../controllers/contactsControllers");

const { ctrlWrappers } = require("../../helpers");

const { validateBody, validateId} = require("../../middlewares");

const schemas = require("../../schemas/contacts")

const router = express.Router();

router.get('/', ctrlWrappers(ctrl.listContacts));

router.get('/:id', ctrlWrappers(ctrl.getContactById));

router.post('/', validateBody(schemas.addSchema), ctrlWrappers(ctrl.addContact));

router.delete('/:id', ctrlWrappers(ctrl.removeContact));

router.put('/:id', validateBody(schemas.addSchema), ctrlWrappers(ctrl.updateContact));

router.patch('/:id/favorite', validateId(schemas.idSchema), validateBody(schemas.favoriteSChema), ctrlWrappers(ctrl.updateFieldFavorite))

module.exports = router
