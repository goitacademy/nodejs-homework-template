const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schemas");

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validation(contactSchema), ctrlWrapper(ctrl.addContact));

router.put(
  "/:contactId",
  validation(contactSchema),
  ctrlWrapper(ctrl.updateContactById)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

module.exports = router;
