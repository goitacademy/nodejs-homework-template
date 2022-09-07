const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const {
  validationBody,
  isValidId,
  authenticate,
} = require("../../middlewares");

const ctrl = require("../../controllers/contacts");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validationBody(schemas.addSchema),
  ctrlWrapper(ctrl.add)
);

router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeById));

router.patch(
  "/:id/favorite",
  isValidId,
  validationBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

router.put("/:id", isValidId, ctrlWrapper(ctrl.updateContactById));

module.exports = router;
