const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody, authenticate } = require("../../middlewares");
const schemas = require("../../schemas/contacts");
const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.add);

router.delete("/:contactId", authenticate, ctrl.deleteById);

router.put(
  "/:contactId",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
