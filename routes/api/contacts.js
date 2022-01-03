const express = require("express");
const router = express.Router();
const { ctrl } = require("../../controllers");
const {
  validation,
  controllerWrap,
  authenticate,
} = require("../../middlewares");
const { joiSchema } = require("../../models/Contact");

router.get("/", authenticate, controllerWrap(ctrl.getAllContacts));

router.get("/:id", authenticate, controllerWrap(ctrl.getContact));

router.post(
  "/",
  authenticate,
  validation(joiSchema),
  controllerWrap(ctrl.addContact)
);

router.put(
  "/:id",
  authenticate,
  validation(joiSchema),
  controllerWrap(ctrl.updateContact)
);

router.patch(
  "/:id/favorite",
  authenticate,
  validation(joiSchema),
  controllerWrap(ctrl.updateStatusContact)
);

router.delete("/:id", authenticate, controllerWrap(ctrl.removeContact));

module.exports = router;
