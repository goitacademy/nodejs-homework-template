const express = require('express')


const {validation, ctrlWrapper} = require("../../middlewares");
const {schemaOfContacts, patchSchema } = require("../../schemas");
const {contacts : ctrl} = require("../../controller/");


const router = express.Router()

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId',ctrlWrapper(ctrl.getById));

router.post('/', validation(schemaOfContacts), ctrlWrapper(ctrl.add));

router.delete('/:contactId', ctrlWrapper(ctrl.remove))

router.put('/:contactId', validation(schemaOfContacts), ctrlWrapper(ctrl.update))

router.patch("/:contactId", validation(patchSchema), ctrlWrapper(ctrl.patch))

module.exports = router;
