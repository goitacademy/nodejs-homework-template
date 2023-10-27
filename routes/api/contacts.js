const express = require('express');

const {validation,ctrlWrapper} =require("../../middlewares");
const {joiSchema,favoriteJoiSchema}=require("../../models/contact")
const {contacts:ctrl}=require("../../controllers/");

const router = express.Router()

router.get('/', ctrlWrapper(ctrl.getAllContacts) )
router.get('/:contactId',ctrlWrapper(ctrl.getContactById))
router.post('/',validation(joiSchema),ctrlWrapper(ctrl.addContact))
router.delete('/:contactId',ctrlWrapper(ctrl.removeContact ))
router.put('/:contactId',validation(joiSchema), ctrlWrapper(ctrl.updateContactById))
router.patch('/:contactId/favorite',validation(favoriteJoiSchema), ctrlWrapper(ctrl.updateFavorite))

module.exports = router;