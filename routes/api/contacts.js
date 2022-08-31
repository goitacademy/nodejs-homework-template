const express = require("express");

const router = express.Router();

const { validation, auth } = require("../../middlewares");
const {
  contactJoiSchema,
  favoriteJoiSchema,
} = require("../../models/contacts");

const { contacts: ctrl } = require("../../controllers/index");

router.get("/", auth, ctrl.getAll);

router.get("/:contactId", ctrl.getContactById);

router.post("/", auth, validation(contactJoiSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.deleteContacts);

router.put("/:contactId", validation(contactJoiSchema), ctrl.updateContact);

router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiSchema),
  ctrl.updateFavorite
);

module.exports = router;
