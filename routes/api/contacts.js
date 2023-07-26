const express = require("express");
const ctrl = require("../../controlers/contacts/");
const { isValidId, validateBody } = require("../../middlewares");
const { shema } = require("../../models/contact");
const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(shema.addShema), ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(shema.addShema),
  ctrl.editContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(shema.updateFavoriteSchema),
  ctrl.editContact
);

module.exports = router;
