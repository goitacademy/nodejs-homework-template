const express = require('express')

const router = express.Router()

const ctrl = require('../../controllers/contacts')

const { schemas } = require("../../models/contact")

const { isValidId, validateBody, auth } = require('../../middlewares')

router.get("/", auth, ctrl.getAll)

router.get('/:contactId', auth, isValidId, ctrl.getById)

router.post('/', auth, validateBody(schemas.addSchema), ctrl.addContact)

router.delete('/:contactId', auth, isValidId, ctrl.deleteContact)

router.put('/:contactId', auth, isValidId, validateBody(schemas.changeSchema), ctrl.updateContact)

router.patch('/:contactId/favorite', auth, isValidId, validateBody(schemas.changeFavoriteStatus), ctrl.updateStatusContact)

module.exports = router
