const express = require("express");

const {
  validation400,
  authenticate,
  controllerWrapper,
  upload,
} = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");
const { contactJoiSchema } = require("../../model/contact");

const router = express.Router();

router.get("/", authenticate, controllerWrapper(ctrl.getAll));

router.get("/:contactId", authenticate, controllerWrapper(ctrl.getContactId));

router.post(
  "/",
  authenticate,
  validation400(contactJoiSchema),
  ctrl.postContact
);

router.delete(
  "/:contactId",
  authenticate,
  controllerWrapper(ctrl.deleteContact)
);

router.put(
  "/:contactId",
  authenticate,
  validation400(contactJoiSchema),
  controllerWrapper(ctrl.selectedContact)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  controllerWrapper(ctrl.putContact)
);
router.patch(
  "/:contactId/users/avatars",
  upload.any("avatar"),
  authenticate,
  controllerWrapper(ctrl.updateAvatars)
);

module.exports = router;
