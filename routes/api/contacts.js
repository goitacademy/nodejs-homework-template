const express = require("express");

const ctrl = require("../../controllers/contacts");

const isValidId = require("../../middlewares/isValidId");
const validateBody = require("../../middlewares/validateContactBody");
const { schemas } = require("../../models/contact");
const validateFavorite = require("../../middlewares/validateFavorite");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

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
  validateFavorite,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
