const express = require("express");

const router = express.Router();

const { ctrlWrapper, validation, isValidId, tokenCheck } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");
const { joiSchema } = require("../../models");

router.get("/", tokenCheck, ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", tokenCheck, isValidId(), ctrlWrapper(ctrl.getContactById));

router.post("/", tokenCheck, validation(joiSchema.contactAdd), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", tokenCheck, isValidId(), ctrlWrapper(ctrl.removeContactById));

router.put(
  "/:contactId",
  tokenCheck,
  isValidId(),
  validation(joiSchema.contactUpd),
  ctrlWrapper(ctrl.updateContactById)
);

router.patch(
  "/:contactId/favorite",
  tokenCheck,
  isValidId(),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
