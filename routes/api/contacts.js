const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const { ctrlWrapper } = require("../../helpers");

const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrlWrapper(ctrl.getAllContacts));

router.get("/:contactId", authenticate, isValidId, ctrlWrapper(ctrl.getContact));

router.post(
  "/",
  authenticate,
  validateBody(schemas.contactAddSchema),
  ctrlWrapper(ctrl.addContact)
);

router.delete("/:contactId", authenticate, isValidId, ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.contactAddSchema),
  ctrlWrapper(ctrl.updateContact)
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
