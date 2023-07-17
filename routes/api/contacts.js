const express = require('express');
 
const ctrl = require('../../controllers/contacts'); 


const router = express.Router()

// routes get contacts list 
router.get('/', ctrl.listAll)

// routes get a contact
router.get('/:contactId', ctrl.getContact)

// routes add a contact 
router.post('/', ctrl.addContact )

// routes delete a contact
router.delete('/:contactId', ctrl.removeContact )

// routes change a contact
router.put('/:contactId', ctrl.updateContact )

module.exports = router;
