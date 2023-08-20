// ywxjZlzJkzN5NjW6

// mongodb+srv://lnteplova:ywxjZlzJkzN5NjW6@cluster0.2e3qn3j.mongodb.net/
const express = require("express");

const ctrl = require("../../controllers");
const {
  validateBody,
  isValidId,
  validateBodyFavorite,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAllListContacts);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.deleteById);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBodyFavorite(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
