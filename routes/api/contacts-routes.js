const express = require('express')
const ctrl = require('../../controllers');
const { validateBody } = require('../../utils');
const { schemas } = require('../../models');

const router = express.Router()


router.get('/', ctrl.listContacts)


router.get('/:contactId', ctrl.getContactById)


router.post('/',
    validateBody(schemas.addShema),
    ctrl.addContact)


router.put("/:contactId",
    validateBody(schemas.addShema),
    ctrl.updateContact)


router.patch("/:contactId/favorite",
    validateBody(schemas.updateSchemaContact),
    ctrl.updateStatusContact);


router.delete('/:contactId', ctrl.removeContact)


module.exports = router
