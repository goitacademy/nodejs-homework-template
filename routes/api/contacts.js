const express = require("express");

const router = express.Router();

const jsonParser = express.json();

const ContactsCtrl = require("../../controllers/contacts");

const { validateBody, validateId } = require("../../middlewares");

const schemes = require("../../schemes/contacts");

router.get("/", ContactsCtrl.getAll);

router.get("/:contactId", validateId, ContactsCtrl.getById);

router.post("/", jsonParser, validateBody(schemes.addSchema), ContactsCtrl.add);

router.delete("/:contactId", validateId, ContactsCtrl.remove);

router.put(
  "/:contactId",
  jsonParser,
  validateBody(schemes.addSchema),
  validateId,
  ContactsCtrl.updateByID
);

router.patch(
  "/:contactId/favorite",
  jsonParser,
  validateBody(schemes.updateFavoriteSchema),
  validateId,
  ContactsCtrl.updateStatusContact
);

module.exports = router;
