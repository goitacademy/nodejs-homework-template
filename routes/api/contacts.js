const express = require('express')

const ctrl = require('../../controllers/contacts')
const { authenticate } = require('../../middlewares');

const router = express.Router()


router.get('/', authenticate, ctrl.getContacts);

router.get('/:id', ctrl.getContactById);

router.post('/', authenticate, ctrl.addContact);

router.put('/:id', ctrl.updateContact);

router.patch('/:id/favorite', ctrl.patchContactById);

router.delete('/:id', ctrl.removeContact);

module.exports = router;