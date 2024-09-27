const ctrl = require("../../controllers/contacts");
const express = require("express");
const router = express.Router();
const { schemas } = require("../../models/contact");
const { validateBody, isValidId, authenticate } = require("../../middlewares");

router.get("/", authenticate, ctrl.allContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.idContact);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.createContact
);

router.delete("/:contactId", authenticate, ctrl.deleteContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.refreshContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
