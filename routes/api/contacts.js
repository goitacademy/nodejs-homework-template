const express = require('express');

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

router.get('/', authenticate, ctrl.getAll);

router.get('/:contactId',isValidId, authenticate,  ctrl.getById);

router.post('/', validateBody(schemas.schemaAdd),authenticate, ctrl.add);

router.delete('/:contactId', isValidId, authenticate, ctrl.deleteById);

router.put('/:contactId', isValidId, validateBody(schemas.schemaAdd), authenticate, ctrl.updateById); 

router.patch("/:contactId/favorite", isValidId, validateBody(schemas.updateFavoriteSchema), authenticate, ctrl.updateFavorite);

module.exports = router;