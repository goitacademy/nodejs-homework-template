const express = require("express");

const router = express.Router();

const controllers = require("../../controllers/contactControllers");

const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contacts");

router.get("/", controllers.getAll);

router.get("/:Id", controllers.getById);

router.post("/", validateBody(schemas.addSchema), controllers.add);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.addSchema),
  controllers.updateById
);
router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  controllers.updateFavorite
);

router.delete("/:Id", isValidId, controllers.deleteById);

module.exports = router;
