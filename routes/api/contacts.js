
const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const {schemas} = require("../../models/contact");

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.delete("/:contactId", isValidId, ctrl.remove);

router.put("/:contactId", validateBody(schemas.addSchema), isValidId, ctrl.update);

router.patch(
  "/:contactId/favorite",
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
