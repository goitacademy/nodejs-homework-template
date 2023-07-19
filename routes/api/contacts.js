const express = require('express');
 
const ctrl = require('../../controllers/contacts'); 
const {validateBody} = require('../../middleware')
const schemas = require('../../schemas/contacts')
const router = express.Router()

// routes get contacts list 
router.get('/', ctrl.listAll)

// routes get a contact
router.get('/:contactId', ctrl.getContact)

// routes add a contact 
router.post('/', validateBody(schemas.addSchema), ctrl.addContact )

// routes delete a contact
router.delete('/:contactId', ctrl.removeContact )

// routes change a contact
router.put('/:contactId', validateBody(schemas.addSchema), ctrl.updateContact )

module.exports = router;


