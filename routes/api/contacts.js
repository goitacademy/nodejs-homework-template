const express = require("express");
const ctrl = require("../../controllers/contactsController");
const { schemas } = require("../../models/contact");
const { validateBody, isValidId, authenticate } = require("../../middleware");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.add);

router.put(
  "/:id",
  authenticate,
  validateBody(schemas.updateSchema),
  ctrl.updateById
);

router.patch(
  "/:id/favorite",
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateById
);

router.delete("/:id", authenticate, ctrl.removeById);

module.exports = router;
