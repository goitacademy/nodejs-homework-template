const express = require('express');
const router = express.Router();

const ctrl = require("../../controllers/contacts")

const {validateBody, isValidId, validateFavoriteStatus, authenticate} = require("../../middlewares");

const {schemas} = require("../../models/contact")

router.get('/', authenticate, ctrl.getAll);

router.get('/:contactId', authenticate, isValidId, ctrl.getById);

router.post('/', authenticate, validateBody(schemas.addSchema), ctrl.add)

router.put('/:contactId', authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateById);

router.delete('/:contactId', authenticate, isValidId, ctrl.deleteById)

router.patch('/:contactId/favorite', authenticate, isValidId, validateFavoriteStatus(schemas.updateFavoriteSchema), ctrl.updateFavorite);

module.exports = router
