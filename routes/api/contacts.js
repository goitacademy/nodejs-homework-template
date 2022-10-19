const express = require("express");
const ctrlWrapper = require("../../helpers/ctrlWrapper");

const { validateBody } = require("../../middlewares");
const contactSchema = require("../../schemas/contacts");
const ctrl = require("../../controllers/contacts");
const isValidId = require("../../middlewares/isValidId");
const updateFavoriteSchema = require("../../schemas/favorite");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", validateBody(contactSchema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  isValidId,
  validateBody(contactSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
