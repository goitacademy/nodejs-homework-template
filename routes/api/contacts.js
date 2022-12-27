const express = require("express");
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const router = express.Router();
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", authenticate, isValidId, ctrlWrapper(ctrl.getContactById));

router.post("/", authenticate, validateBody(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", authenticate, isValidId, ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId", authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateContact)
);
router.patch(
  "/:contactId/favorite", authenticate, isValidId, validateBody(schemas.updateFavoriteShema), ctrlWrapper(ctrl.updateFavorite)
)
module.exports = router;
