const express = require("express");

const { authenticate, validateSchema } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const { contacts: ctrl } = require("../../controllers");
const { schemas } = require("../../schemas/schemasValidation");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", authenticate, ctrlWrapper(ctrl.getContactById));

router.post(
  "/",
  authenticate,
  validateSchema(schemas.contactSchema),
  ctrlWrapper(ctrl.addContact)
);

router.delete("/:contactId", authenticate, ctrlWrapper(ctrl.removeContact));

router.put("/:contactId", authenticate, ctrlWrapper(ctrl.updateContact));

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateSchema(schemas.favoriteSchema),
  ctrlWrapper(ctrl.updateContactByFavorite)
);

module.exports = router;
