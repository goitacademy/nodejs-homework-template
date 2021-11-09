const express = require('express')
const router = express.Router()
const contactsCtrl = require('../../controllers/contacts')
const { joiContactsShcemaAdd, joiContactsShcemaUpd } = require('../../middlewares/validation/joiSchema')
const validation = require('../../middlewares/validation/validation')
const authenticate = require('../../middlewares/authenticate')
const controllerWrapper = require('../../middlewares/controllerWrapper')

router.get('/', controllerWrapper(authenticate), contactsCtrl.getAllContactsCtrl)

router.get('/:contactId', contactsCtrl.getContactByIdCtrl)

router.post('/', controllerWrapper(authenticate), validation(joiContactsShcemaAdd), contactsCtrl.addContactCtrl)

router.delete('/:contactId', contactsCtrl.removeContactCtrl)

router.patch('/:contactId', validation(joiContactsShcemaUpd), contactsCtrl.updateContactCtrl)

router.patch('/:contactId/favorite', contactsCtrl.updateStatusContact)

module.exports = router
