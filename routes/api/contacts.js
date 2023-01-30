const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");

const router = express.Router();

const { joiSchema, favoriteSchema } = require("../../models/contact");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.addContact));

router.put("/:contactId", validation(joiSchema), ctrlWrapper(ctrl.updateById));

router.patch(
  "/:contactId/favorite",
  validation(favoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

module.exports = router;
