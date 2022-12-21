const express = require("express");

const { contacts: ctrl } = require("../../controllers");
const { validate } = require("../../schema/schema");
const { contact, favoriteJoySchema } = require("../../schema/midleware");
const { auth } = require("../../midlewares");

const router = express.Router();

router.get("/", auth, ctrl.getContact);

router.get("/:contactId", ctrl.getById);

router.post("/", auth, validate(contact), ctrl.add);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", validate(contact), ctrl.update);

router.patch(
  "/:contactId/favorite",
  validate(favoriteJoySchema),
  ctrl.updateFavorite
);

module.exports = router;
