const express = require("express");
const ctrl = require("../../controllers/controller");
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contacts");
const { validateFavorite } = require("../../middlewares/validateFavorite");

const router = express.Router();

router.get("/", ctrl.getContacts);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.createContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateFavorite(schemas.updateFavorite),
  ctrl.updateFavorite
);

router.delete("/:contactId", isValidId, ctrl.removeById);

module.exports = router;
