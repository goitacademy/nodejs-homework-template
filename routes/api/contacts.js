const express = require('express');

const controller = require("../../controllers/contacts");

const { controllerWrapper } = require("../../helpers");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const {schemas} = require("../../models/contacts");

const router = express.Router();

router.get('/', authenticate, controllerWrapper(controller.listContacts));

router.get('/:contactId', authenticate, isValidId, controllerWrapper(controller.getContactById));

router.post('/', authenticate, validateBody(schemas.addSchema), controllerWrapper(controller.addContact));

router.delete('/:contactId', authenticate, isValidId, controllerWrapper(controller.removeContact));

router.put('/:contactId', authenticate, isValidId, validateBody(schemas.addSchema), controllerWrapper(controller.updateContact));

router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(schemas.updateFavoriteSchema, "missing field favorite"), controllerWrapper(controller.updateFavorite));

module.exports = router;
