const express = require("express");
const ctrl = require("../../controlers/contacts");
const router = express.Router();
const { schemas } = require("../../models/contact");
const {
  validateBody,
  emptyBody,
  isValidid,
  authenticate,
} = require("../../middlewares");

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, isValidid, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidid,
  validateBody(schemas.updateFavoretesSchema),
  ctrl.updateStatusContact
);

router.delete("/:id", authenticate, isValidid, ctrl.removeContact);

router.put(
  "/:id",
  authenticate,
  isValidid,
  emptyBody,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

module.exports = router;