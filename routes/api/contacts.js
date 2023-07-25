const express = require('express')

const router = express.Router()

const ctrl = require("../../controllers/ctrlContacts")

const {validateBody, isValid, authenticate} = require("../../midllewares");

const {schemas} = require("../../models/contact")

router.get('/', authenticate, ctrl.getAll)

router.get('/:contactId', authenticate, isValid,  ctrl.getById)

router.post('/', authenticate, validateBody(schemas.addSchema), ctrl.add)

router.put('/:contactId', authenticate, isValid, validateBody(schemas.addSchema), ctrl.update)

router.patch('/:contactId/favorite', authenticate, isValid, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite)

router.delete('/:contactId', authenticate, isValid, ctrl.remove )


module.exports = router;