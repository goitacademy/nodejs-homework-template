const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const { ctrlWrapper } = require("../../helpers");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", authenticate, isValidId, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validateBody(schemas.contactsSchema),
  ctrlWrapper(ctrl.add)
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.contactsSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.deleteById)
);

module.exports = router;
