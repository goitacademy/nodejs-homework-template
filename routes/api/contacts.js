const express = require('express')

const ctrl = require('../../controllers/contacts')

const  ctrlWrapper  = require('../../middleware/ctrlWrapper')

const router = express.Router()

const user = require('../../middleware/user')

router.get('/', ctrlWrapper(ctrl.listContacts))

router.get('/:id', user, ctrlWrapper(ctrl.getContactById))

router.post('/', user, ctrlWrapper(ctrl.addContact))

router.delete('/:id', user, ctrlWrapper(ctrl.removeContact))

router.put('/:id', user, ctrlWrapper(ctrl.updateContact))

router.patch('/:id/favorite', user, ctrlWrapper(ctrl.updateFavorite))

module.exports = router;

