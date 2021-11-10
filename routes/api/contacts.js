const express = require('express')
const router = express.Router()

const contactsCtrl = require('../../controllers/contacts')
const { joiContactsShcemaAdd, joiContactsShcemaUpd } = require('../../middlewares/validation')
const { validation } = require('../../middlewares/validation')
const { controllerWrapper, authenticate } = require('../../middlewares')

router.get('/', controllerWrapper(authenticate), controllerWrapper(contactsCtrl.getAllContactsCtrl))

router.get('/:contactId', controllerWrapper(authenticate), controllerWrapper(contactsCtrl.getContactByIdCtrl))

router.post('/', controllerWrapper(authenticate), validation(joiContactsShcemaAdd), controllerWrapper(contactsCtrl.addContactCtrl))

router.delete('/:contactId', controllerWrapper(authenticate), controllerWrapper(contactsCtrl.removeContactCtrl))

router.patch('/:contactId', controllerWrapper(authenticate), validation(joiContactsShcemaUpd), controllerWrapper(contactsCtrl.updateContactCtrl))

router.patch('/:contactId/favorite', controllerWrapper(authenticate), controllerWrapper(contactsCtrl.updateStatusContact))

module.exports = router
