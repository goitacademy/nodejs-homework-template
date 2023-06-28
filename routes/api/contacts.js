const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewars");
const schemas = require("../../schemas/contacts");

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.addNew);

router.put("/:contactId", authenticate, isValidId, validateBody(schemas.updateSchema), ctrl.updateById);

router.patch("/:contactId/favorite", authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteById);

module.exports = router;
