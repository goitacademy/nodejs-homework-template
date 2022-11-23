const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../middlewares");
const { validation } = require("../../middlewares");
const { contactSchema } = require("../../schemas");

const validateMiddlware = validation(contactSchema);

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validateMiddlware, ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.put("/:contactId", validateMiddlware, ctrlWrapper(ctrl.updateById));

module.exports = router;
