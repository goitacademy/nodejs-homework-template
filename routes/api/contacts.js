const express = require("express");

const { ctrlWrapper, validation } = require("../../middlewares");
const { contactSchema } = require("../../schemas");

const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validation(contactSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrl.removeContact);

router.put(
  "/:contactId",
  validation(contactSchema),
  ctrlWrapper(ctrl.updateContact)
);

module.exports = router;
