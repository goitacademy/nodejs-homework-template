const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");
const { validate, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validate(schemas.addSchema), ctrl.add);

router.delete("/:contactId", isValidId, ctrl.remove);

router.put(
  "/:contactId",
  isValidId,
  validate(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validate(schemas.updateFavorite),
  ctrl.updateById
);

module.exports = router;
