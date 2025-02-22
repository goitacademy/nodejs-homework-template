const express = require('express')

const router = express.Router()

const ctrl = require('../../controllers/contacts')

const {validateBody, isValidId, authenticate} = require('../../middlewares')

const {schemas} = require('../../models/contact')

router.get('/', authenticate, ctrl.getAll )

router.get('/:id', authenticate, isValidId, ctrl.getById)

router.post('/', authenticate, validateBody(schemas.addSchema), ctrl.add)

router.delete('/:id', authenticate, isValidId, ctrl.delById)

router.put('/:id', authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateById)

router.patch('/:id/favorite', authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite)

module.exports = router
