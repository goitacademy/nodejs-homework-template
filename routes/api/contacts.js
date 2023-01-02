const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const { ctrlWrapper, validation, auth } = require("../../middlewares");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");

const validateMiddlware = validation(joiSchema);

router.get("/", auth, ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", auth, validateMiddlware, ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.put("/:contactId", validateMiddlware, ctrlWrapper(ctrl.updateById));

router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
