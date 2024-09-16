const express = require("express");

const controllers = require("../../controllers");
const { HttpError, ctrlWrapper } = require("../../helpers");
const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", ctrlWrapper(controllers.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(controllers.getById));

router.post("/", ctrlWrapper(controllers.add));

router.put("/:contactId", isValidId, ctrlWrapper(controllers.updateBuId));

router.patch(
  "/:contactId/favorite",
  isValidId,
  ctrlWrapper(controllers.updateFavorite)
);

router.delete("/:contactId", isValidId, ctrlWrapper(controllers.deleteById));

module.exports = router;