const express = require('express');

const ctrl = require('../../controllers/contacts');

const {
  bodyValidator,
  contactIdValidator,
  authentificator,
} = require("../../middlewares");

const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', authentificator, ctrl.listContacts);

router.get(
  "/:contactId",
  authentificator,
  contactIdValidator,
  ctrl.getContactByID
);

router.post(
  '/',
  authentificator,
  bodyValidator(schemas.addSchema),
  ctrl.addContact
);

router.delete(
  "/:contactId",
  authentificator,
  contactIdValidator,
  ctrl.removeContact
);

router.put(
  "/:contactId",
  authentificator,
  contactIdValidator,
  bodyValidator(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authentificator,
  contactIdValidator,
  bodyValidator(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
