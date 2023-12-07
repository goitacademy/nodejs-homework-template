const express = require("express");

const router = express.Router();

const controllers = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

router.get("/", controllers.getAll);

router.get("/:contactId", isValidId, controllers.getById);

router.post("/", validateBody(schemas.addSchema), controllers.add);

router.delete("/:contactId", isValidId, controllers.deleteById);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  controllers.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  controllers.updateFavorite
);

module.exports = router;
