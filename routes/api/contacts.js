const express = require('express');

const ctrl = require("../../controllers/contacts");

const { validateBody, authenticate}  = require("../../middlewares");

const schemas = require("../../schemas/contacts");
const { isValidId } = require("../../middlewares");

const router = express.Router();

router.use(authenticate);

router.get('/', ctrl.getAll);

router.get('/:contactId', isValidId, ctrl.getById);

router.post('/', validateBody(schemas.addSchema), ctrl.addContact);

router.delete('/:contactId', isValidId, ctrl.removeContact);

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), ctrl.updateContact);

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.ContactUpdateFavoriteShema), ctrl.updateFavorite);

module.exports = router;
