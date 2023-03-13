const express = require('express')

const router = express.Router()



const {contacts: ctrl } = require('../../controllers')


router.get('/', ctrl.listContacts);

router.get('/:id', ctrl.getById);

router.post('/',ctrl.addContact);

router.put('/:id', ctrl.updateContact);


router.delete('/:contactId', ctrl.removeContact);


module.exports = router
