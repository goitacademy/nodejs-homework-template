const express = require("express");

const router = express.Router();
const contrl = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../midlewares");
const { schemas } = require("../../models/contact");

router.get("/", contrl.getAll);

router.get("/:contactId", isValidId, contrl.getById);

router.post("/", validateBody(schemas.userInputSchema), contrl.add);

router.delete("/:contactId", isValidId, contrl.deleteById);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.userInputSchema),
  contrl.updateById
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoritSchema),
  contrl.updateFavorite
);

module.exports = router;
