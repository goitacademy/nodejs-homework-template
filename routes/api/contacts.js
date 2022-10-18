const express = require('express')
const { isValidId, validateBody, authenticate } = require('../../middlewares')
const router = express.Router()
const  {ctrlWrapper} = require('../../heplers')
const {schemas} = require('../../models/contact')
const ctrl = require('../../controllers/contacts')






router.get('/',authenticate, ctrlWrapper(ctrl.getAll));

router.get('/:contactId',authenticate, isValidId ,ctrlWrapper(ctrl.getById))

router.post('/',authenticate, validateBody(schemas.addSchema),  ctrlWrapper(ctrl.add))

router.delete('/:contactId',authenticate,isValidId, ctrlWrapper(ctrl.removeById))

router.put('/:contactId',authenticate,isValidId, validateBody(schemas.addSchema), ctrlWrapper(ctrl.updateById))


router.patch('/:contactId/favorite',authenticate,isValidId, validateBody(schemas.updateFavorites), ctrlWrapper(ctrl.updateFavorite))


module.exports = router


