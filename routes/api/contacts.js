const express = require('express')
const { authenticate ,validation, ctrlWrapper } = require("../../middlewares");
const { joiContactSchema, joiContactStatusSchema} = require("../../models/contacts");
const {contacts: contactsCtrl} = require("../../controllers")

const router = express.Router()

router.get('/', authenticate,ctrlWrapper(contactsCtrl.getAll));

router.get('/:contactId', authenticate,ctrlWrapper(contactsCtrl.getById));

router.post('/', authenticate,validation(joiContactSchema), ctrlWrapper(contactsCtrl.add))

router.delete('/:contactId', authenticate,ctrlWrapper(contactsCtrl.removeById));

router.put('/:contactId', authenticate,validation(joiContactSchema), ctrlWrapper(contactsCtrl.updateById));

router.patch("/:contactid/favorite", authenticate,validation(joiContactStatusSchema), ctrlWrapper(contactsCtrl.updateStatus))

module.exports = router;
