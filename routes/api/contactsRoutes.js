
const express = require("express");
const controllers = require("../../controllers/contactsControllers");

const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");
const router = express.Router();
router.get("/", controllers.getAll);

router.get("/:contactId", isValidId, controllers.getById);

router.post("/", validateBody(schemas.addSchema), controllers.add);

router.delete("/:contactId", isValidId, controllers.deleteById);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.updateContactSchema),
  controllers.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  controllers.updateFavorite
);

module.exports = router;