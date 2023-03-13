const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId, authenticate } = require("../../midlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.contactsSchema), ctrl.add);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteById);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.contactsSchema),
  ctrl.upDateById
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.upDateFavorite
);

module.exports = router;
