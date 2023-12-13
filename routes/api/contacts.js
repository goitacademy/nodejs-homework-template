const express = require('express')
const {validateBody, isValidId} = require('../../middlewares')
const {joiAddSchema, joiFavoriteSchema} = require('../../models/Contact')
const ctrl = require('../../controllers/contacts-controllers')

const router = express.Router()

const contactAddValidate = validateBody(joiAddSchema);
const contactUpdateFavorite = validateBody(joiFavoriteSchema);

router.get('/', ctrl.getAll)

router.get('/:contactId', isValidId, ctrl.getById)

router.post('/', contactAddValidate, ctrl.add)

router.put('/:contactId', isValidId, contactAddValidate, ctrl.updateById)

router.patch('/:contactId/favorite', isValidId, contactUpdateFavorite, ctrl.updateStatusContact)

router.delete('/:contactId', isValidId, ctrl.deleteById)

module.exports = router
