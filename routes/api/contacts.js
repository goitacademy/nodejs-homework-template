const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const {
  validateBody,
  isValidId,
  emptyBody,
  authenticate,
  userContacts,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, userContacts, ctrl.getById);

router.post(
  "/",
  emptyBody(),
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.add
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  userContacts,
  ctrl.deleteById
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  userContacts,
  emptyBody(),
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  userContacts,
  emptyBody("missing field favorite"),
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
