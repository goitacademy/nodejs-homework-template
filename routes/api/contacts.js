const express = require("express");

const ctrl = require("../../controllers/contacts");
const { validateBody, haveBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, haveBody, validateBody(schemas.addSchema), ctrl.add);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteById);

router.patch("/:contactId/favorite", authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite)

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  haveBody,
  validateBody(schemas.addSchema),
  ctrl.updateContactById
);

module.exports = router;
