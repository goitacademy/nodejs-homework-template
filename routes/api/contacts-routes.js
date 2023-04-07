const express = require('express')
const ctrl = require('../../controllers');
const { validateBody } = require('../../utils');
const schemas = require('../../schemas');


const router = express.Router()


router.get('/', ctrl.listContacts)

router.get('/:contactId', ctrl.getContactById)

router.post('/', validateBody(schemas.addSchema), ctrl.addContact)

router.delete('/:contactId', ctrl.removeContact)

router.put("/:contactId", validateBody(schemas.addSchema), ctrl.updateContact)


module.exports = router
