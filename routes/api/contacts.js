const express = require('express')

const ctrl = require('../../controllers/contacts');

const { validateBody } = require('../../middlewares/validateBody');

const { schemas } = require("../../models");

const { isValidId } = require("../../middlewares");


const router = express.Router()

router.get('/', ctrl.listContacts);

router.get('/:contactId', isValidId, ctrl.getById);

router.post('/', validateBody(addSchemaPost), ctrl.addContact);

router.delete('/:contactId', isValidId, ctrl.removeContact);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.put('/:contactId', isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

module.exports = router
