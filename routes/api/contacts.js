const express = require("express");

const router = express.Router();

const {
  validation,
  ctrlWrapper,
  isValidId,
  authenticate,
} = require("../../middlewares");

const {
  schema: { joiAddSchema, joiUpdateSchema },
} = require("../../models/contact");

const { contacts: ctrl } = require("../../controllers");

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.getContactById)
);

router.post(
  "/",
  authenticate,
  validation(joiAddSchema, "missing required name field"),
  ctrlWrapper(ctrl.add)
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.deleteById)
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validation(joiAddSchema, "missing fields"),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validation(joiUpdateSchema, "missing field favorite"),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
