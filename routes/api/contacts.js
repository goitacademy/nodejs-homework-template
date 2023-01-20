const express = require("express");
const router = express.Router();

const { validation, ctrlWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schema/contacts");
const { ctrl } = require("../../controllers");

const validateMiddleware = validation(contactSchema);

router.get("/", ctrlWrapper(ctrl.getAllContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validateMiddleware, ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.deleteContactById));

router.put(
  "/:contactId",
  validateMiddleware,
  ctrlWrapper(ctrl.updateContactById)
);

module.exports = router;
