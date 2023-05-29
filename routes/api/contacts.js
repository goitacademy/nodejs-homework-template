const express = require('express')
const ctrlr = require('../../controllers/contacts')
const { validateBody, isValidId, authenticate } = require('../../middlewares')
const { schemas } = require('../../models/contact')

const router = express.Router()

router.get('/', authenticate, ctrlr.getAll)

router.get('/:contactId', authenticate, isValidId, ctrlr.getById)

router.post('/', authenticate, validateBody(schemas.addSchema), ctrlr.add)

router.delete('/:contactId', authenticate, isValidId, ctrlr.deleteById)

router.put('/:contactId', authenticate, isValidId, validateBody(schemas.addSchema), ctrlr.updateById)

router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrlr.updateFavorite)

module.exports = router
