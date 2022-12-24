const express = require("express");
const router = express.Router();

const { ctrlWrapper } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");

const { validateSchema } = require("../../helpers/validateSchema");
const schemas = require("../../schemas/shemasValidation");

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post(
  "/",
  validateSchema(schemas.contactSchema),
  ctrlWrapper(ctrl.addContact)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  validateSchema(schemas.contactSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  validateSchema(schemas.contactSchema),
  ctrlWrapper(ctrl.updateContactByFavorite)
);

module.exports = router;
