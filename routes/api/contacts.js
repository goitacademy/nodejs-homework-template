const express = require("express");

const ctrl = require("../../controllers/contacts");
// перевірка на валідацію
const { validateBody, isValidId, authenticate } = require("../../midlewares");

const { schemas} = require("../../models/contacts");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.add);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavotiteSchema),
  ctrl.updateFavorite
);

router.delete("/:id", authenticate, isValidId, ctrl.deleteById);

module.exports = router;
module.exports = router;
