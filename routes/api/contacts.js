const express = require('express')
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiContactSchema, joiContactStatusSchema} = require("../../models/contacts");
const {contacts: contactsCtrl} = require("../../controllers")

const router = express.Router()

router.get('/', ctrlWrapper(contactsCtrl.getAll));

router.get('/:contactId', ctrlWrapper(contactsCtrl.getById));

router.post('/', validation(joiContactSchema), ctrlWrapper(contactsCtrl.add))

router.delete('/:contactId', ctrlWrapper(contactsCtrl.removeById));

router.put('/:contactId', validation(joiContactSchema), ctrlWrapper(contactsCtrl.updateById));

router.patch("/:contactid/favorite", validation(joiContactStatusSchema), ctrlWrapper(contactsCtrl.updateStatus))

module.exports = router;
