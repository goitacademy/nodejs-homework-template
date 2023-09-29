const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { contactSchemas } = require("../../models");

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post(
  "/",
  authenticate,
  authenticate,
  validateBody(contactSchemas.addSchema),
  ctrl.add
);

router.delete("/:id", authenticate, isValidId, ctrl.deleteById);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(contactSchemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(contactSchemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
