const express = require('express')
const ctrl = require('../../controllers');
const { validateBody } = require('../../utils');
const {schemas} = require('../../models');


const router = express.Router()


router.get('/', ctrl.listContacts)

router.get('/:contactId', ctrl.getContactById)

router.post('/',validateBody(schemas.schemas), ctrl.addContact)

router.put("/:contactId", validateBody(schemas.schemas), ctrl.updateContact)

router.patch("/:id/favorite", validateBody(schemas.updateStatusContact), ctrl.updateStatusContact);

router.delete('/:contactId', ctrl.removeContact)

module.exports = router
