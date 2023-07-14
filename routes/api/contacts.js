const express = require("express");
const ctrl = require("../../controlers/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const schema = require("../../schemas/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(schema.contactSchema), ctrl.add);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteById);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schema.contactSchema),
  ctrl.updateById
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schema.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
