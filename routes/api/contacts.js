const express = require('express')

const ctrl = require('../../controllers/contacts');

const { validateBody, isValidId, authenticate  } = require('../../middlewares');

const { schemas } = require("../../models");


const router = express.Router()

router.get('/', authenticate, ctrl.listContacts);

router.get('/:contactId', authenticate, isValidId, ctrl.getById);

router.post('/', authenticate, validateBody(schemas.addSchema), ctrl.addContact);

router.delete('/:contactId', authenticate, isValidId, ctrl.removeContact);


router.put('/:contactId', authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateContact);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router
