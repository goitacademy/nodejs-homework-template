const express = require('express')

const ctrl = require('../../controllers/contacts')

const  ctrlWrapper  = require('../../middleware/ctrlWrapper')

const router = express.Router()

const auth = require('../../middleware/auth')

router.get('/', ctrlWrapper(ctrl.listContacts))

router.get('/:id', auth, ctrlWrapper(ctrl.getContactById))

router.post('/', auth, ctrlWrapper(ctrl.addContact))

router.delete('/:id', auth, ctrlWrapper(ctrl.removeContact))

router.put('/:id', auth, ctrlWrapper(ctrl.updateContact))

router.patch('/:id/favorite', auth, ctrlWrapper(ctrl.updateFavorite))

module.exports = router;

