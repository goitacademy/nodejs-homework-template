const express = require("express");

const ctrl = require("../../controlers");
const { schemas } = require("../../models/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const router = express.Router();

router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getOneContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addOneContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavoriteContact
);

module.exports = router;
