const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const { validation, authenticate } = require("../../middlewares");

const {
  addContactSchema,
  updContactSchema,
  updateFavoriteSchema,
} = require("../../models/contact");

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, ctrl.getById);

router.post("/", authenticate, validation(addContactSchema), ctrl.add);

router.delete("/:contactId", authenticate, ctrl.deleteById);

router.put(
  "/:contactId",
  authenticate,
  validation(updContactSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  validation(updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
