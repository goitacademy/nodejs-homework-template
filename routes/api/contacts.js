const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId, autenticate } = require("../../middlewares");

const { shemas } = require("../../models/contact");

const router = express.Router();

router.get("/", autenticate, ctrl.getAll);

router.get("/:id", autenticate, isValidId, ctrl.getById);

router.post("/", autenticate, validateBody(shemas.addSchema), ctrl.add);

router.put(
  "/:id",
  autenticate,
  isValidId,
  validateBody(shemas.addSchema),
  ctrl.updateById
);

router.delete("/:id", autenticate, isValidId, ctrl.deleteById);

router.patch(
  "/:id/favorite",
  autenticate,
  isValidId,
  validateBody(shemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
