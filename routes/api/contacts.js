const express = require("express");

const { postSchema, putSchema, patchSchema } = require("../../models/contact");
const { validation, ctrlWrapper, auth } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(auth), ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post(
  "/",
  ctrlWrapper(auth),
  validation(postSchema),
  ctrlWrapper(ctrl.postContact)
);

router.delete("/:contactId", ctrlWrapper(ctrl.deleteContact));

router.put("/:contactId", validation(putSchema), ctrlWrapper(ctrl.putContact));

router.patch(
  "/:contactId/favorite",
  validation(patchSchema),
  ctrlWrapper(ctrl.patchFavorite)
);

module.exports = router;
