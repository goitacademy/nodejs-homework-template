const express = require('express')

const ctrl = require('../../controllers/contacts')

const router = express.Router()


router.get('/', ctrl.getContacts);

router.get('/:id', ctrl.getContactById);

router.post('/', ctrl.addContact);

router.put('/:id', ctrl.updateContact);

router.patch('/:id/favorite', ctrl.patchContactById);

router.delete('/:id', ctrl.removeContact);

module.exports = router;
