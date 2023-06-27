const express = require('express')
const ctrl = require("../../controllers")
const {validateBody, isValidId} = require('../../middlewares')
const {addSchema, updateFavoriteSchema} = require('../../schemas')
const router = express.Router()

router.get('/', ctrl.getAll)

router.get('/:contactId', isValidId, ctrl.getById)

router.post('/', validateBody(addSchema), ctrl.add)

router.delete('/:contactId', isValidId, ctrl.remove)

router.put('/:contactId', isValidId, validateBody(addSchema), ctrl.update)

router.patch('/:contactId/favorite', isValidId, validateBody(updateFavoriteSchema), ctrl.updateFavorite)

module.exports = router