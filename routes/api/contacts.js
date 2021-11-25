const express = require("express");
const router = express.Router();
const Joi = require("joi");

const { contacts: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { contactsSchema } = require("../../schemas");
const validateMiddleware = validation(contactsSchema);

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:id", ctrlWrapper(ctrl.getContactById));

router.post("/", validateMiddleware, ctrlWrapper(ctrl.addContact));

router.delete("/:id", ctrlWrapper(ctrl.removeContact));

router.put("/:id", validateMiddleware, ctrlWrapper(ctrl.updateContactById));

module.exports = router;
