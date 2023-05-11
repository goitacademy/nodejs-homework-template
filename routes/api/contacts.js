const express = require("express");

const router = express.Router();
const cntrl = require("../../controllers/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { validationContact, validationFavorite } = require("../../models");

router.get("/", authenticate, cntrl.getAll);

router.get("/:contactId", authenticate, isValidId, cntrl.getById);

router.post(
  "/",
  authenticate,
  validateBody(validationContact),
  cntrl.addContact
);

router.delete("/:contactId", authenticate, isValidId, cntrl.removeContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(validationContact),
  cntrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(validationFavorite),
  cntrl.updateStatusContact
);

module.exports = router;
