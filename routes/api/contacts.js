const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../midlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.contactsSchema), ctrl.add);

router.delete("/:contactId", isValidId, ctrl.deleteById);

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
