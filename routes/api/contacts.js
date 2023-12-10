const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");

const {
  validateBodyForPost,
  validateBodyForPatch,
  invalidId,
  authenticate,
} = require("../../middleWare");

const schemas = require("../../schemas/contacts");

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, invalidId, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  validateBodyForPost(schemas.addSchema),
  ctrl.addContact
);

router.delete("/:contactId", authenticate, invalidId, ctrl.removeContact);

router.put(
  "/:contactId",
  authenticate,
  invalidId,
  validateBodyForPost(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  invalidId,
  validateBodyForPatch(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
