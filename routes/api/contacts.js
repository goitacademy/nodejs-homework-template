const express = require('express');
const router = express.Router();

const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId, authentificate } = require("../../middlewares");
const { schemas } = require("../../models/contact")


router.get("/", authentificate, ctrl.listContacts);

router.get('/:contactId', authentificate, isValidId, ctrl.getContactById);

router.post("/", authentificate, validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", authentificate, isValidId, ctrl.removeContact);

router.put("/:contactId", authentificate, isValidId, validateBody(schemas.addSchema), ctrl.updateContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router
