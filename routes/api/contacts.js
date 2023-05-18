const express = require('express')

const router = express.Router()

const ctrl = require('../../controllers/contacts')

const validateBody = require("../../middlewares/validateBody")

const { schemas } = require("../../models/contact")
const { isValidId } = require('../../middlewares')

router.get("/", ctrl.getAll)

router.get('/:contactId', isValidId, ctrl.getById)

router.post('/', validateBody(schemas.addSchema), ctrl.addContact)

router.delete('/:contactId', isValidId, ctrl.deleteContact)

router.put('/:contactId', isValidId, validateBody(schemas.changeSchema), ctrl.updateContact)

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.changeFavoriteStatus), ctrl.updateStatusContact)

module.exports = router
