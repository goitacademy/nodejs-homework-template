const express = require('express')

const router = express.Router()

const ctrl = require('../../controllers/contacts')

const validateBody = require("../../middlewares/validateBody")

const schemas = require("../../schemas/contacts")

const { schemas } = require("../../models/contact")
const { isValidId, validateBody, auth } = require('../../middlewares')

const { schemas } = require("../../models/contact")
const { isValidId } = require('../../middlewares')

router.get("/", auth, ctrl.getAll)

router.get('/:contactId', ctrl.getById)

router.get('/:contactId', auth, isValidId, ctrl.getById)

router.get('/:contactId', isValidId, ctrl.getById)

router.post('/', auth, validateBody(schemas.addSchema), ctrl.addContact)

router.delete('/:contactId', ctrl.deleteContact)

router.put('/:contactId', validateBody(schemas.changeSchema), ctrl.updateContact)

router.delete('/:contactId', auth, isValidId, ctrl.deleteContact)

router.put('/:contactId', auth, isValidId, validateBody(schemas.changeSchema), ctrl.updateContact)

router.patch('/:contactId/favorite', auth, isValidId, validateBody(schemas.changeFavoriteStatus), ctrl.updateStatusContact)

router.delete('/:contactId', isValidId, ctrl.deleteContact)

router.put('/:contactId', isValidId, validateBody(schemas.changeSchema), ctrl.updateContact)

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.changeFavoriteStatus), ctrl.updateStatusContact)

module.exports = router
