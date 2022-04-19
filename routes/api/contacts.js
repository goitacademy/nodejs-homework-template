const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewars");
const { joiSchema, favoriteSchema } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  validation(joiSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId",
  validation(favoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
