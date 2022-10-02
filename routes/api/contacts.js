const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schemas");

const validateMiddleware = validation(contactSchema);

router.get("/", ctrlWrapper(ctrl.getListContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validateMiddleware, ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContactById));

router.put("/:contactId", validateMiddleware, ctrlWrapper(ctrl.updateContactById));

module.exports = router;
