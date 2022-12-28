const { validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const ctrl = require("../../controllers/contacts");

const express = require("express");
const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.addShema), ctrl.add);

router.delete("/:contactId", authenticate, ctrl.deleteById);

router.put(
  "/:contactId",
  authenticate,
  validateBody(schemas.addShema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(schemas.updateFavoriteShema),
  ctrl.updateFavorite
);

module.exports = router;
