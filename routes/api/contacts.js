const express = require("express");

const ctrl = require("../../controllers/contacts");
const { validateBody, haveBody, isValidId, authenticate } = require("../../middlewares");
const { addSchema, updateFavoriteSchema } = require("../../models/joiSchemas");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, haveBody, validateBody(addSchema), ctrl.add);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteById);

router.patch("/:contactId/favorite", authenticate, isValidId, validateBody(updateFavoriteSchema), ctrl.updateFavorite)

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  haveBody,
  validateBody(addSchema),
  ctrl.updateContactById
);

module.exports = router;
