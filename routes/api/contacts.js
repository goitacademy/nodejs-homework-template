const express = require("express");

const router = express.Router();

const { schemas } = require("../../models/contacts");
const { validation, ctrlWrapper } = require("../../middlewares");

const ctrl  = require("../../controllers/contacts");


router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validation(schemas.add), ctrlWrapper(ctrl.add));

router.put("/:id", validation(schemas.add), ctrlWrapper(ctrl.updateById));

router.delete("/:id", ctrlWrapper(ctrl.deleteById));

router.patch(
  "/:id/favorite",
  validation(schemas.updateFavorite),
  ctrlWrapper(ctrl.updateFavoriteContact)
);

module.exports = router;