const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/contacts");
const { contactSchemas } = require("../../schemas");
const { validateBody, isValidId, authenticate } = require("../../middlewares");

router.get("/", authenticate, controllers.getAll);

router.get("/:contactId", isValidId, authenticate, controllers.getById);

router.post(
  "/",
  authenticate,
  validateBody(contactSchemas.validatingSchema, "Missing required field"),
  controllers.postNew
);

router.delete("/:contactId", isValidId, controllers.deleteById);

router.put(
  "/:contactId",
  isValidId,
  authenticate,
  validateBody(contactSchemas.validatingSchema, "Missing fields"),
  controllers.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  authenticate,
  validateBody(contactSchemas.updateFavoriteSchema, "Missing field favorite"),
  controllers.updateFavorite
);

module.exports = router;
