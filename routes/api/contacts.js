const express = require('express')
const router = express.Router()
const useAuth = require('./useAuth')
const { contacts: ctrl } = require('../../controllers')

router.get('/', useAuth, ctrl.getAllContacts)

router.get('/:id', useAuth, ctrl.getOneContact)

router.post('/', express.json(), useAuth, ctrl.addContact)

router.put('/:id', express.json(), useAuth, ctrl.updateContact)

router.patch('/:id/favorite', express.json(), useAuth, ctrl.updateFavorite)

router.delete('/:id', useAuth, ctrl.deleteContact)

module.exports = router
