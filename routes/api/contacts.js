const express = require("express");

const { validateBody } = require("../../middlewares");
const { isValidId, authenticate } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const ctrl = require("../../controllers");

const router = express.Router();

router.use(authenticate);

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.delete("/:contactId", isValidId, ctrl.deleteById);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.contactUpdateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
