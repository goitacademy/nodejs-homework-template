const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const {
  ctrlWrapper,
  isValidId,
  validateSchema,
  auth,
} = require("../../middlewares");
const {
  createContactSchema,
  updateContactFavoriteSchema,
} = require("../../models/contact");

router.get("/", auth, ctrlWrapper(ctrl.getContacts));
router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getContactId));
router.post(
  "/",
  auth,
  validateSchema(createContactSchema),
  ctrlWrapper(ctrl.postContact)
);
router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.deleteContact));
router.put("/:contactId", isValidId, ctrlWrapper(ctrl.putContact));
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateSchema(updateContactFavoriteSchema),
  ctrlWrapper(ctrl.patchContact)
);

module.exports = router;
