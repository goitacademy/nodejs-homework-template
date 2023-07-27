const express = require("express");
const ctrl = require("../../controlers/contacts/");
const { isValidId, validateBody, Authenticate } = require("../../middlewares");
const { shema } = require("../../models/contact");
const router = express.Router();

router.get("/", Authenticate, ctrl.getAll);

router.get("/:contactId", Authenticate, isValidId, ctrl.getById);

router.post("/", Authenticate, validateBody(shema.addShema), ctrl.addContact);

router.delete("/:contactId", Authenticate, isValidId, ctrl.deleteContact);

router.put(
  "/:contactId",
  Authenticate,
  isValidId,
  validateBody(shema.addShema),
  ctrl.editContact
);
router.patch(
  "/:contactId/favorite",
  Authenticate,
  isValidId,
  validateBody(shema.updateFavoriteSchema),
  ctrl.editContact
);

module.exports = router;
