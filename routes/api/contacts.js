const express = require('express');
const ctrl = require('../../controllers/contacts');
// const validateBody = require ('../../middelewares/validateBody');
// const schema = require ('../../schemas/contacts');

const router = express.Router()

router.get('/', ctrl.getAllContacts)

// router.get('/:id', ctrl.getContactById)

// router.post('/', validateBody(schema.addSchema), ctrl.addContact)

// router.delete('/:id', ctrl.deleteContactById)

// router.put('/:id', validateBody(schema.addSchema), ctrl.updateContact)

module.exports = router


