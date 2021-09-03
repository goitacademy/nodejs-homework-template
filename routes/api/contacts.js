const express = require('express')
const ctrl = require('../../controllers')

const router = express.Router()

<<<<<<< HEAD
router.get('/', ctrl.listContacts)

router.get('/:contactId', ctrl.getContactById)

router.post('/', ctrl.addContact)

router.delete('/:contactId', ctrl.removeContact)

router.put('/:contactId', ctrl.updateContact)
=======
const { JoiContactSchema } = require('../../model')
const { validation } = require('../../middlewares')

const validateMiddleware = validation(JoiContactSchema)

const ctrl = require('../../controllers')

router.get('/', ctrl.listContacts)

router.get('/:contactId', ctrl.getContactById)

router.post('/', validateMiddleware, ctrl.addContact)

router.delete('/:contactId', ctrl.removeContact)

router.put('/:contactId', validateMiddleware, ctrl.updateContact)

router.patch('/:contactId/favorite', ctrl.updateFavorite)
>>>>>>> origin/hw-03-mongodb

module.exports = router
