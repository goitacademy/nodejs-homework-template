const express = require("express");
const router = express.Router();
const { ctrl } = require("../../controllers");
const {
  validation,
  controllerWrap,
  authenticate,
  validationID,
} = require("../../middlewares");
const {
  joiSchema,
  joiQuerySearchSchema,
  joiFavoriteSchema,
} = require("../../models/Contact");

router.get(
  "/",
  authenticate,
  validation(joiQuerySearchSchema),
  controllerWrap(ctrl.getAllContacts)
);

router.get("/:id", authenticate, validationID, controllerWrap(ctrl.getContact));

router.post(
  "/",
  authenticate,
  validation(joiSchema),
  controllerWrap(ctrl.addContact)
);

router.put(
  "/:id",
  authenticate,
  validationID,
  validation(joiSchema),
  controllerWrap(ctrl.updateContact)
);

router.patch(
  "/:id/favorite",
  authenticate,
  validationID,
  validation(joiFavoriteSchema),
  controllerWrap(ctrl.updateStatusContact)
);

router.delete(
  "/:id",
  authenticate,
  validationID,
  controllerWrap(ctrl.removeContact)
);

module.exports = router;
