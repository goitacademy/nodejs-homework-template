const express = require("express");

const { validation, ctrlWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schemas");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validation(contactSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  validation(contactSchema),
  ctrlWrapper(ctrl.updateContactById)
);

module.exports = router;
