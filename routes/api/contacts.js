const express = require("express");

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const {
  validationBody,
  isValidId,
  authenticate,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.listContacts));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getContactById));

router.post(
  "/",
  authenticate,
  validationBody(schemas.addSchema),
  ctrlWrapper(ctrl.addContact)
);

router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeContact));

router.put(
  "/:id",
  isValidId,
  validationBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:id/favorite",
  isValidId,
  validationBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
