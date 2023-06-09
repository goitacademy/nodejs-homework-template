const express = require('express')
const cntr = require("../../controllers/contacts")
const { schemas } = require("../../models/contact")
const router = express.Router();
const {validateBody, isValidId} = require("../../middlewares")

router.get('/', cntr.getAll);

router.get('/:contactId',isValidId, cntr.getById);

router.post('/',validateBody(schemas.addSchema), cntr.add);

router.delete('/:contactId',isValidId, cntr.deleteById);

router.put('/:contactId',isValidId, validateBody(schemas.addSchema), cntr.updateById);

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), cntr.updateFavorite);

module.exports = router

 