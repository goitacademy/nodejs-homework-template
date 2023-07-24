const express = require('express')

const router = express.Router()

const ctrl = require("../../controllers/controllers")

const {validateBody, isValid} = require("../../midllewares");

const {schemas} = require("../../models/contact")

router.get('/', ctrl.getAll)

router.get('/:contactId', isValid,  ctrl.getById)

router.post('/', validateBody(schemas.addSchema), ctrl.add)

router.put('/:contactId', isValid, validateBody(schemas.addSchema), ctrl.update)

router.patch('/:contactId/favorite', isValid, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite)

router.delete('/:contactId', isValid, ctrl.remove )


module.exports = router