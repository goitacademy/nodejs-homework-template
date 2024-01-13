const express = require("express");

const ctrl = require("../../controllers/contacts");
const {
  isEmptyBody,
  validateBody,
  authontificate,
} = require("../../middlewars");
const { schemas } = require("../../models/contact");
const isValidId = require("../../middlewars/isValidId");

const router = express.Router();

router.get("/", authontificate, ctrl.listContact);

router.get("/:contactId", authontificate, isValidId, ctrl.getContactById);

router.patch(
  "/:contactId/favorite",
  authontificate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

router.post(
  "/",
  authontificate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.put(
  "/:contactId",
  authontificate,
  isEmptyBody,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);
router.delete("/:contactId", authontificate, isValidId, ctrl.removeContact);
module.exports = router;
