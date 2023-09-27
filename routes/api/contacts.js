const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middleware");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post(
  "/",
  validateBody(schemas.addSchema, "Missing required name field"),
  ctrl.add
);

router.delete("/:contactId", isValidId, ctrl.removeById);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema, "Missing fields"),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema, "Missing field favorite"),
  ctrl.updateFavoriteById
);

module.exports = router;
