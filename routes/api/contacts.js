const express = require('express');
// const { json } = require('express');
const ctrl = require("../../controllers/contactsControllers");

const { ctrlWrappers } = require("../../helpers");

const { validateBody, validateId } = require("../../middlewares");

const schemas = require("../../schemas/contacts")

const router = express.Router();

router.get('/', ctrlWrappers(ctrl.listContacts));

router.get('/:id', ctrlWrappers(ctrl.getContactById));

router.post('/', validateBody(schemas.addShema), ctrlWrappers(ctrl.addContact));

router.delete('/:id', ctrlWrappers(ctrl.removeContact))

router.put('/:id', validateId, validateBody(schemas.addShema), ctrlWrappers(ctrl.updateContact))

module.exports = router
