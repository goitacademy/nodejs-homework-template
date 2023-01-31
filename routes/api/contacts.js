const express = require("express");
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validateBody(schemas.addScheme), ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.deleteById));

router.put(
  "/:contactId",
  validateBody(schemas.addScheme),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  validateBody(schemas.updateFavoriteScheme),
  ctrlWrapper(ctrl.updateFavorit)
);

module.exports = router;
