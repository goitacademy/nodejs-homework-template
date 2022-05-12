const express = require('express')
const { ctrlWrapper , validation}=require('../../middlewares')
const {joiShema, favoriteJoiShema}=require('../../models/contact')

const {contacts: ctrl} = require('../../controllers')

const router = express.Router()

router.get('/', ctrlWrapper(ctrl.listContact))

router.get('/:contactId', ctrlWrapper(ctrl.getContactById))

router.post('/', validation(joiShema), ctrlWrapper(ctrl.addContact))

router.put('/:contactId', validation(joiShema), ctrlWrapper(ctrl.updateContact))

router.delete('/:contactId', ctrlWrapper(ctrl.removeContact))

router.patch('/:contactId/favorite',
    validation(favoriteJoiShema),
    ctrlWrapper(ctrl.updateContactStatus)
);

module.exports = router;