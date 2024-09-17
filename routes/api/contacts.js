const express = require('express')

const ctrl = require('../../controllers/contacts')

const {validateBody, isValidId, authenticate} =require('../../middelwares')
const {schemas} = require('../../models/contact')

const router = express.Router()

router.get('/', authenticate, ctrl.getAll )

router.get('/:id', authenticate, isValidId,  ctrl.getById )

router.post('/', authenticate, validateBody(schemas.addSchemas), ctrl.addContact)

router.put('/:id', authenticate, isValidId, validateBody(schemas.addSchemas), ctrl.updateById)

router.patch('/:id/favorite', authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact)

router.delete('/:id', authenticate, isValidId, ctrl.deleteById)

module.exports = router
