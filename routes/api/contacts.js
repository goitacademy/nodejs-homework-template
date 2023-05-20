const express = require('express');
const router = express.Router();

const ctrl = require("../../controllers/contacts")

const {validateBody, isValidId, validateFavoriteStatus} = require("../../middlewares");

const {schemas} = require("../../models/contact")

router.get('/', ctrl.getAll);

router.get('/:contactId', isValidId, ctrl.getById);

router.post('/', validateBody(schemas.addSchema), ctrl.add)

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), ctrl.updateById);

router.delete('/:contactId', isValidId, ctrl.deleteById)

router.patch('/:contactId/favorite', isValidId, validateFavoriteStatus(schemas.updateFavoriteSchema), ctrl.updateFavorite);

module.exports = router
