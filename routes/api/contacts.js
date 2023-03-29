const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.schema), ctrl.add);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeById);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.schema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorit",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteScheme),
  ctrl.updateById
);

module.exports = router;
