const express = require("express");

const { contacts: ctrl } = require("../../controllers");
const { authh, ctrlWrapper, validation } = require("../../middlewares");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");

const validateMiddleware = validation(joiSchema);

const router = express.Router();

router.get("/", authh, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getId));

router.post("/", authh, validateMiddleware, ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.deleteId));

router.put("/:contactId", validateMiddleware, ctrlWrapper(ctrl.updateContact));

router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.patchFavorite)
);

module.exports = router;
