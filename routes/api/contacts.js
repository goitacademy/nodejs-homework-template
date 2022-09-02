const express = require("express");

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");
const { isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", authenticate, ctrlWrapper(ctrl.add));

router.put("/:contactId", isValidId, ctrlWrapper(ctrl.updateById));

router.patch(
  "/:contactId/favorite",
  isValidId,
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.deleteById));

module.exports = router;
