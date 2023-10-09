const express = require('express')
const controllers = require('../../controllers/controllers.js')
const isEmptyBody = require('../../middlewares/isEmptyBody.js')
const validateBody = require('../../decorators/validateBody.js')
const schemaValidate = require('../../models/Contact.js')
const isValidId = require('../../middlewares/isValidId.js')

const contactAddValidate = validateBody(schemaValidate.addSchema);
const contactUpdateValidate = validateBody(schemaValidate.updateSchema)
const contactUpdateValidateFavorite = validateBody(schemaValidate.updateFavoriteSchema)

const router = express.Router()

router.get('/', controllers.getAll)

router.get('/:contactId', isValidId, controllers.getById)

router.delete('/:contactId', isValidId, controllers.deleteById)

router.post('/', contactAddValidate, isEmptyBody, controllers.add)

router.put('/:contactId', isValidId, contactUpdateValidate, isEmptyBody, controllers.updateById)

router.patch('/:contactId/favorite',isValidId, contactUpdateValidateFavorite, isEmptyBody, controllers.updateById)

module.exports = router
