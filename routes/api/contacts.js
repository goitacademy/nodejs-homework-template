const express = require("express");
const ctrl = require("../../controllers/contacts/");
const { validation, isValidId, authMiddlewar } = require("../../middlewares");
const { schemas } = require("../../models/contacts");

const router = express.Router();

router.get("/", authMiddlewar, ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", authMiddlewar, validation(schemas.ubdateContact), ctrl.add);

router.delete("/:contactId", isValidId, ctrl.deleteById);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validation(schemas.updateFavorite),
  ctrl.updateFavorite
);

router.put(
  "/:contactId",
  isValidId,
  validation(schemas.ubdateContact),
  ctrl.updateById
);

module.exports = router;
