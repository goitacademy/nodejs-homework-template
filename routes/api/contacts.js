const express = require("express");
const { validation, ctrlWrapper } = require("../../middlewars");
const { contactSchema } = require("../../schema");
const { patchContactSchema } = require("../../schema");
const { contacts: ctrl } = require("../../controllers");
const validateMiddleware = validation(contactSchema);
const patchValidateMiddleware = validation(patchContactSchema);
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validateMiddleware, ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.patch("/:contactId", patchValidateMiddleware, ctrlWrapper(ctrl.updateContact));

module.exports = router;
