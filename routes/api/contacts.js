const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts.js");

const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact.js");

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.schema), ctrl.add);

router.delete("/:contactId", isValidId, ctrl.delById);

router.put("/:contactId", isValidId, validateBody(schemas.schema), ctrl.update);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
