const express = require('express');

const controller = require("../../controllers/contacts");

const { controllerWrapper } = require("../../helpers");

const { validateBody, isValidId } = require("../../middlewares");

const {schemas} = require("../../models/contacts");

const router = express.Router();

router.get('/', controllerWrapper(controller.listContacts));

router.get('/:contactId', isValidId, controllerWrapper(controller.getContactById));

router.post('/', validateBody(schemas.addSchema), controllerWrapper(controller.addContact));

router.delete('/:contactId', isValidId, controllerWrapper(controller.removeContact));

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), controllerWrapper(controller.updateContact));

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteSchema, "missing field favorite"), controllerWrapper(controller.updateFavorite));

module.exports = router;
