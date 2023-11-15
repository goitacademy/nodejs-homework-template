const express = require('express')

const ctrl = require('../../controllers/contacts')

const {validateBody, isValidId} =require('../../middelwares')
const {schemas} = require('../../models/contact')

const router = express.Router()
router.get('/', ctrl.getAll )

router.get('/:id', isValidId,  ctrl.getById )

router.post('/', validateBody(schemas.addSchemas), ctrl.addContact)

router.put('/:id', isValidId, validateBody(schemas.addSchemas), ctrl.updateById)

router.patch('/:id/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact)

router.delete('/:id', isValidId, ctrl.deleteById)

module.exports = router
