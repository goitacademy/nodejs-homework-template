const express = require("express");

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

module.exports = router;

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getContactById));

router.post("/", validateBody(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoiteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeContact));

module.exports = router;
