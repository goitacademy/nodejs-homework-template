const express = require('express')
const ctrlr = require('../../controllers/contacts')
const { validateBody, isValidId } = require('../../middlewares')
const { schemas } = require('../../models/contact')

const router = express.Router()

router.get('/', ctrlr.getAll)

router.get('/:contactId', isValidId, ctrlr.getById)

router.post('/', validateBody(schemas.addSchema), ctrlr.add)

router.delete('/:contactId', isValidId, ctrlr.deleteById)

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), ctrlr.updateById)

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), ctrlr.updateFavorite)

module.exports = router
