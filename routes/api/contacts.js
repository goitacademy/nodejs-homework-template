const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody, validateFavorite } = require("../../middlewares");
const { schemas } = require("../../models/contact");
const { isValid } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const { authenticate } = require("../../middlewares");

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:id", authenticate, isValid, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.addContact)
);

router.delete("/:id", authenticate, isValid, ctrlWrapper(ctrl.deleteContact));

router.put(
  "/:id",
  authenticate,
  isValid,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateContact)
);
router.patch(
  "/:id/favorite",
  authenticate,
  isValid,
  validateFavorite(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);
module.exports = router;
