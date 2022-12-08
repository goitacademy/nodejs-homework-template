const express = require("express");

const { contactValidation, ctrlWrapper } = require("../../middlewares");

const { postContactSchema, putContactSchema } = require("../../schemas");

const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post(
  "/",
  contactValidation(postContactSchema),
  ctrlWrapper(ctrl.addContact)
);

router.put(
  "/:contactId",
  contactValidation(putContactSchema),
  ctrlWrapper(ctrl.updateContactById)
);

router.delete("/:contactId", ctrl.removeContact);

module.exports = router;
