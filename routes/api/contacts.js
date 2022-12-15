const express = require("express");

const { contacts: ctrl } = require("../../controllers");

const { validate } = require("../../schema/schema");
const { contact, favoriteJoySchema } = require("../../schema/midleware");

const router = express.Router();

router.get("/", ctrl.getContact);

router.get("/:contactId", ctrl.getById);

router.post("/", validate(contact), ctrl.add);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", validate(contact), ctrl.update);

router.patch(
  "/:contactId/favorite",
  validate(favoriteJoySchema),
  ctrl.updateFavorite
);

module.exports = router;
