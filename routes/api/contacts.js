const express = require("express");

const { contacts: ctrl } = require("../../controllers");

const { isValidId, validation, auth } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", auth, isValidId, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  auth,
  validation(schemas.addContact),
  ctrlWrapper(ctrl.addContact)
);

router.delete("/:contactId", auth, isValidId, ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  auth,
  isValidId,
  validation(schemas.addContact),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  auth,
  isValidId,
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
