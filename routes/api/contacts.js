const express = require("express");

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const { auth, validation, validationId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:id", validationId, ctrlWrapper(ctrl.getById));

router.post("/", auth, ctrlWrapper(ctrl.add));

router.put(
  "/:id",
  validationId,
  validation(schemas.add),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:id/favorite",
  validationId,
  validation(schemas.updateFavorite),
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:id", validationId, ctrlWrapper(ctrl.removeById));

module.exports = router;
