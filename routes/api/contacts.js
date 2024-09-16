const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contacts')
const {validate, authenticate} = require('../../middlewars')
const schemas = require('../../schemas/contacts')

router.use(authenticate)

router.get('/', ctrl.getAll)

router.get('/:contactId', ctrl.getById)

router.post('/', validate.validBody(schemas.addSchema), ctrl.add)

router.delete('/:contactId', ctrl.deleteRecord)

router.put('/:contactId', validate.validEmptyBody(), ctrl.update)

router.patch('/:contactId/favorite', validate.validateBody(schemas.contactUpdateFavouriteSchema), ctrl.update)

module.exports = router
