const express = require("express");

const ctrl = require("../../controllers/contacts-controllers");
const { validateBody } = require("../../utils");
const { schemas } = require("../../models/contact");
const { isValidId, authentificate } = require("../../middlewares");

const router = express.Router();

router.get("/", authentificate, ctrl.getAllContacts);

router.get("/:contactId", authentificate, isValidId, ctrl.getContactById);

router.post(
  "/",
  authentificate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.delete("/:contactId", authentificate, isValidId, ctrl.deleteContactById);

router.put(
  "/:contactId",
  authentificate,
  validateBody(schemas.putSchema),
  ctrl.updateContactById
);

router.patch(
  "/:contactId/favorite",
  authentificate,
  validateBody(schemas.patchFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
