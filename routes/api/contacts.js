const express = require("express");

const router = express.Router();

const { ctrlWrapper, validation, isValidId } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");
const { joiSchema } = require("../../models");

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", isValidId(), ctrlWrapper(ctrl.getContactById));

router.post("/", validation(joiSchema.contactAdd), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", isValidId(), ctrlWrapper(ctrl.removeContactById));

router.put(
  "/:contactId",
  isValidId(),
  validation(joiSchema.contactUpd),
  ctrlWrapper(ctrl.updateContactById)
);

router.patch("/:contactId/favorite", isValidId(), ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;
