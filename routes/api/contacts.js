const express = require('express')
const {validateBody, isValidId, authenticate} = require('../../middlewares')
const {joiAddSchema, joiFavoriteSchema} = require('../../models/Contact')
const ctrl = require('../../controllers/contacts-controllers')

const router = express.Router()

const contactAddValidate = validateBody(joiAddSchema);
const contactUpdateFavorite = validateBody(joiFavoriteSchema);

router.get('/', authenticate, ctrl.getAll)

router.get('/:contactId', authenticate, isValidId, ctrl.getById)

router.post('/', authenticate, contactAddValidate, ctrl.add)

router.put('/:contactId', authenticate, isValidId, contactAddValidate, ctrl.updateById)

router.patch('/:contactId/favorite', authenticate, isValidId, contactUpdateFavorite, ctrl.updateStatusContact)

router.delete('/:contactId', authenticate, isValidId, ctrl.deleteById)

module.exports = router
