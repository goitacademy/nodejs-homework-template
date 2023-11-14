const express = require('express')
const router = express.Router()

const { controllerWrapper, validator } = require('../../middelware')
const { contacts: ctrl } = require('../../controllers')
const { contactsSchema } = require('../../schemas')

router.get('/', controllerWrapper(ctrl.listContacts))

router.get('/:contactId', controllerWrapper(ctrl.getById))

router.post('/', validator(contactsSchema), controllerWrapper(ctrl.add))

router.delete('/:contactId', controllerWrapper(ctrl.removeById))

router.put('/:contactId', validator(contactsSchema), controllerWrapper(ctrl.updateById))

module.exports = router