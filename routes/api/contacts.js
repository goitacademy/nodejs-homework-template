const express = require("express");

const ctrl = require("../../controllers/contacts");

const {
  validateBody,
  validateBodyPost,
  isValidId,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getContactById);

router.post("/", validateBodyPost(schemas.addSchema), ctrl.addContact);

router.delete("/:id", isValidId, ctrl.removeContact);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.updateSchema),
  ctrl.updateContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);
module.exports = router;
