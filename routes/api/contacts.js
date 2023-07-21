const express = require('express');

const ctrl = require('../../controllers/contacts')

const { bodyValidator, idValidator } = require('../../middlewares');

const { schemas } = require('../../models/contact');

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", idValidator, ctrl.getContactByID);

router.post("/", bodyValidator(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", idValidator, ctrl.removeContact);

router.put("/:contactId", idValidator, bodyValidator(schemas.addSchema), ctrl.updateContact);

router.patch("/:contactId/favorite", idValidator, bodyValidator(schemas.updateFavoriteSchema), ctrl.updateFavorite);

module.exports = router;
