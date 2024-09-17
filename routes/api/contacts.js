const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");

const {
  validateBodyForPost,
  validateBodyForPatch,
  invalidId,
} = require("../../middleWare");
const schemas = require("../../schemas/contacts");

router.get("/", ctrl.listContacts);

router.get("/:contactId", invalidId, ctrl.getContactById);

router.post("/", validateBodyForPost(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", invalidId, ctrl.removeContact);

router.put(
  "/:contactId",
  invalidId,
  validateBodyForPost(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  invalidId,
  validateBodyForPatch(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
